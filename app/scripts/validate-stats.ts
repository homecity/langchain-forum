/**
 * Validation Script for Forum Statistics
 * Verifies the structure and integrity of generated stats
 */

import * as fs from 'fs'
import * as path from 'path'

const statsFile = path.join(process.cwd(), 'data', 'forum-stats.json')

function validate() {
  console.log('🔍 Validating forum statistics...\n')

  // Check file exists
  if (!fs.existsSync(statsFile)) {
    console.error('❌ Error: forum-stats.json not found')
    process.exit(1)
  }

  // Parse JSON
  const stats = JSON.parse(fs.readFileSync(statsFile, 'utf-8'))

  // Validate structure
  const checks = [
    { name: 'File exists', pass: fs.existsSync(statsFile) },
    { name: 'Has metrics', pass: !!stats.metrics },
    { name: 'Has categoryDistribution', pass: !!stats.categoryDistribution },
    { name: 'Has monthlyVolume', pass: !!stats.monthlyVolume },
    { name: 'Has tagResolution', pass: !!stats.tagResolution },
    { name: 'Has recentActivity', pass: !!stats.recentActivity },
    { name: 'Has generatedAt', pass: !!stats.generatedAt },
    {
      name: 'Metrics complete',
      pass:
        stats.metrics.total === stats.metrics.resolved + stats.metrics.active,
    },
    {
      name: 'Resolution rate valid',
      pass:
        stats.metrics.resolutionRate >= 0 && stats.metrics.resolutionRate <= 100,
    },
    {
      name: 'Categories are sorted',
      pass: stats.categoryDistribution.every(
        (cat: any, i: number, arr: any[]) =>
          i === 0 || arr[i - 1].value >= cat.value
      ),
    },
    { name: 'Monthly data valid', pass: stats.monthlyVolume.length > 0 },
    { name: 'Tag resolution valid', pass: stats.tagResolution.length <= 10 },
    { name: 'Recent activity valid', pass: stats.recentActivity.length <= 10 },
  ]

  // Print results
  console.log('Validation Results:')
  checks.forEach((check) => {
    console.log(`  ${check.pass ? '✅' : '❌'} ${check.name}`)
  })

  // Print summary
  console.log('\nStatistics Summary:')
  console.log(`  Total Issues: ${stats.metrics.total}`)
  console.log(`  Resolved: ${stats.metrics.resolved}`)
  console.log(`  Active: ${stats.metrics.active}`)
  console.log(`  Resolution Rate: ${stats.metrics.resolutionRate}%`)
  console.log(
    `  Top Category: ${stats.categoryDistribution[0]?.name} (${stats.categoryDistribution[0]?.value} posts)`
  )
  console.log(
    `  Categories: ${stats.categoryDistribution.length} total`
  )
  console.log(
    `  Monthly Data Points: ${stats.monthlyVolume.length} months`
  )
  console.log(`  Top Tags: ${stats.tagResolution.length} tags`)
  console.log(`  Recent Activities: ${stats.recentActivity.length} posts`)
  console.log(`  Generated: ${new Date(stats.generatedAt).toLocaleString()}`)

  const allPass = checks.every((c) => c.pass)
  if (allPass) {
    console.log('\n✅ All validations passed!')
  } else {
    console.log('\n❌ Some validations failed!')
    process.exit(1)
  }
}

validate()
