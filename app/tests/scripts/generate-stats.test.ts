/**
 * Tests for Forum Statistics Generation Script
 */

import * as fs from 'fs'
import * as path from 'path'

describe('Forum Statistics Generation', () => {
  const statsFile = path.join(process.cwd(), 'data', 'forum-stats.json')

  beforeAll(() => {
    // Ensure stats file exists (should be generated before tests)
    if (!fs.existsSync(statsFile)) {
      throw new Error(
        'forum-stats.json not found. Run "npx ts-node scripts/generate-stats.ts" first.'
      )
    }
  })

  test('stats file should exist and be valid JSON', () => {
    expect(fs.existsSync(statsFile)).toBe(true)

    const content = fs.readFileSync(statsFile, 'utf-8')
    const stats = JSON.parse(content)

    expect(stats).toBeDefined()
    expect(typeof stats).toBe('object')
  })

  test('should have all required top-level properties', () => {
    const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))

    expect(stats).toHaveProperty('metrics')
    expect(stats).toHaveProperty('categoryDistribution')
    expect(stats).toHaveProperty('monthlyVolume')
    expect(stats).toHaveProperty('tagResolution')
    expect(stats).toHaveProperty('recentActivity')
    expect(stats).toHaveProperty('generatedAt')
  })

  describe('metrics', () => {
    test('should have correct structure', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const { metrics } = stats

      expect(metrics).toHaveProperty('total')
      expect(metrics).toHaveProperty('resolved')
      expect(metrics).toHaveProperty('active')
      expect(metrics).toHaveProperty('resolutionRate')
      expect(metrics).toHaveProperty('avgResponseTime')
      expect(metrics).toHaveProperty('trends')
    })

    test('should have valid numeric values', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const { metrics } = stats

      expect(typeof metrics.total).toBe('number')
      expect(typeof metrics.resolved).toBe('number')
      expect(typeof metrics.active).toBe('number')
      expect(typeof metrics.resolutionRate).toBe('number')

      expect(metrics.total).toBeGreaterThan(0)
      expect(metrics.resolved).toBeGreaterThanOrEqual(0)
      expect(metrics.active).toBeGreaterThanOrEqual(0)
      expect(metrics.total).toBe(metrics.resolved + metrics.active)
    })

    test('resolution rate should be between 0 and 100', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const { metrics } = stats

      expect(metrics.resolutionRate).toBeGreaterThanOrEqual(0)
      expect(metrics.resolutionRate).toBeLessThanOrEqual(100)
    })

    test('trends should have correct structure', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const { trends } = stats.metrics

      expect(trends).toHaveProperty('total')
      expect(trends).toHaveProperty('resolved')
      expect(trends).toHaveProperty('active')
      expect(trends).toHaveProperty('resolutionRate')

      expect(typeof trends.total).toBe('number')
      expect(typeof trends.resolved).toBe('number')
      expect(typeof trends.active).toBe('number')
      expect(typeof trends.resolutionRate).toBe('number')
    })
  })

  describe('categoryDistribution', () => {
    test('should be an array', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      expect(Array.isArray(stats.categoryDistribution)).toBe(true)
    })

    test('each category should have correct structure', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const categories = stats.categoryDistribution

      categories.forEach((category: any) => {
        expect(category).toHaveProperty('name')
        expect(category).toHaveProperty('value')
        expect(category).toHaveProperty('percentage')

        expect(typeof category.name).toBe('string')
        expect(typeof category.value).toBe('number')
        expect(typeof category.percentage).toBe('number')

        expect(category.value).toBeGreaterThan(0)
        expect(category.percentage).toBeGreaterThan(0)
        expect(category.percentage).toBeLessThanOrEqual(100)
      })
    })

    test('percentages should sum to approximately 100', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const categories = stats.categoryDistribution

      const totalPercentage = categories.reduce(
        (sum: number, cat: any) => sum + cat.percentage,
        0
      )

      // Allow small rounding errors
      expect(totalPercentage).toBeGreaterThan(99)
      expect(totalPercentage).toBeLessThan(101)
    })

    test('should be sorted by value descending', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const categories = stats.categoryDistribution

      for (let i = 0; i < categories.length - 1; i++) {
        expect(categories[i].value).toBeGreaterThanOrEqual(categories[i + 1].value)
      }
    })
  })

  describe('monthlyVolume', () => {
    test('should be an array', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      expect(Array.isArray(stats.monthlyVolume)).toBe(true)
    })

    test('each month should have correct structure', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const months = stats.monthlyVolume

      months.forEach((month: any) => {
        expect(month).toHaveProperty('month')
        expect(month).toHaveProperty('issues')

        expect(typeof month.month).toBe('string')
        expect(typeof month.issues).toBe('number')

        // Month should be in YYYY-MM format
        expect(month.month).toMatch(/^\d{4}-\d{2}$/)
        expect(month.issues).toBeGreaterThan(0)
      })
    })

    test('should be sorted chronologically (oldest to newest)', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const months = stats.monthlyVolume

      for (let i = 0; i < months.length - 1; i++) {
        expect(months[i].month.localeCompare(months[i + 1].month)).toBeLessThanOrEqual(0)
      }
    })

    test('should contain at most 12 months', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      expect(stats.monthlyVolume.length).toBeLessThanOrEqual(12)
    })
  })

  describe('tagResolution', () => {
    test('should be an array', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      expect(Array.isArray(stats.tagResolution)).toBe(true)
    })

    test('each tag should have correct structure', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const tags = stats.tagResolution

      tags.forEach((tag: any) => {
        expect(tag).toHaveProperty('tag')
        expect(tag).toHaveProperty('total')
        expect(tag).toHaveProperty('resolved')
        expect(tag).toHaveProperty('rate')

        expect(typeof tag.tag).toBe('string')
        expect(typeof tag.total).toBe('number')
        expect(typeof tag.resolved).toBe('number')
        expect(typeof tag.rate).toBe('number')

        expect(tag.total).toBeGreaterThan(0)
        expect(tag.resolved).toBeGreaterThanOrEqual(0)
        expect(tag.resolved).toBeLessThanOrEqual(tag.total)
        expect(tag.rate).toBeGreaterThanOrEqual(0)
        expect(tag.rate).toBeLessThanOrEqual(100)
      })
    })

    test('should contain at most 10 tags', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      expect(stats.tagResolution.length).toBeLessThanOrEqual(10)
    })

    test('should be sorted by total descending', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const tags = stats.tagResolution

      for (let i = 0; i < tags.length - 1; i++) {
        expect(tags[i].total).toBeGreaterThanOrEqual(tags[i + 1].total)
      }
    })
  })

  describe('recentActivity', () => {
    test('should be an array', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      expect(Array.isArray(stats.recentActivity)).toBe(true)
    })

    test('each activity should have correct structure', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const activities = stats.recentActivity

      activities.forEach((activity: any) => {
        expect(activity).toHaveProperty('title')
        expect(activity).toHaveProperty('status')
        expect(activity).toHaveProperty('date')
        expect(activity).toHaveProperty('url')

        expect(typeof activity.title).toBe('string')
        expect(typeof activity.status).toBe('string')
        expect(typeof activity.date).toBe('string')
        expect(typeof activity.url).toBe('string')

        expect(['SOLVED', 'OPEN']).toContain(activity.status)
        expect(activity.url).toMatch(/^https?:\/\//)
      })
    })

    test('should contain at most 10 activities', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      expect(stats.recentActivity.length).toBeLessThanOrEqual(10)
    })

    test('should be sorted by date descending (most recent first)', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const activities = stats.recentActivity

      for (let i = 0; i < activities.length - 1; i++) {
        expect(activities[i].date.localeCompare(activities[i + 1].date)).toBeGreaterThanOrEqual(0)
      }
    })
  })

  describe('generatedAt', () => {
    test('should be a valid ISO timestamp', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))

      expect(typeof stats.generatedAt).toBe('string')
      expect(new Date(stats.generatedAt).toString()).not.toBe('Invalid Date')

      // Should be in ISO format
      expect(stats.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    test('should be recent (within last hour)', () => {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))
      const generatedDate = new Date(stats.generatedAt)
      const now = new Date()
      const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)

      expect(generatedDate.getTime()).toBeGreaterThan(hourAgo.getTime())
      expect(generatedDate.getTime()).toBeLessThanOrEqual(now.getTime())
    })
  })
})
