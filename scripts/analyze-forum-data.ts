#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface ForumPost {
  topicId: string;
  title: string;
  created: string;
  url: string;
  tags: string[];
  status: 'SOLVED' | 'OPEN';
  postCount: number;
  year: number;
  month: number;
}

interface ParsedData {
  posts: ForumPost[];
  totalPosts: number;
  dateRange: {
    earliest: string;
    latest: string;
  };
}

function analyzeForumData() {
  const dataPath = '/Users/jihyunjeong/Documents/Github/langchain/data/forum-parsed.json';
  const data: ParsedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log('=== FORUM DATA ANALYSIS ===\n');

  // 1. Most active discussions (by post count)
  console.log('Top 10 Most Active Discussions:');
  const topActive = [...data.posts]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 10);

  topActive.forEach((post, idx) => {
    console.log(`${idx + 1}. [${post.postCount} posts] ${post.title}`);
    console.log(`   ${post.url} (${post.status})`);
  });

  // 2. Tag co-occurrence analysis
  console.log('\n\nTag Co-occurrence (top combinations):');
  const tagPairs: Record<string, number> = {};

  data.posts.forEach(post => {
    if (post.tags.length > 1) {
      const sortedTags = [...post.tags].sort();
      for (let i = 0; i < sortedTags.length; i++) {
        for (let j = i + 1; j < sortedTags.length; j++) {
          const pair = `${sortedTags[i]} + ${sortedTags[j]}`;
          tagPairs[pair] = (tagPairs[pair] || 0) + 1;
        }
      }
    }
  });

  const topPairs = Object.entries(tagPairs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  topPairs.forEach(([pair, count]) => {
    console.log(`  ${pair}: ${count} posts`);
  });

  // 3. Solved rate by tag
  console.log('\n\nSolved Rate by Tag:');
  const tagStats: Record<string, { total: number; solved: number }> = {};

  data.posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!tagStats[tag]) {
        tagStats[tag] = { total: 0, solved: 0 };
      }
      tagStats[tag].total++;
      if (post.status === 'SOLVED') {
        tagStats[tag].solved++;
      }
    });
  });

  const tagSolvedRates = Object.entries(tagStats)
    .filter(([_, stats]) => stats.total >= 10) // Only tags with 10+ posts
    .map(([tag, stats]) => ({
      tag,
      total: stats.total,
      solved: stats.solved,
      rate: (stats.solved / stats.total) * 100,
    }))
    .sort((a, b) => b.rate - a.rate);

  tagSolvedRates.forEach(({ tag, total, solved, rate }) => {
    console.log(`  ${tag}: ${rate.toFixed(1)}% (${solved}/${total})`);
  });

  // 4. Trend analysis (posts over time)
  console.log('\n\nMonthly Trend (all time):');
  const monthlyTrend: Record<string, { total: number; solved: number }> = {};

  data.posts.forEach(post => {
    const key = `${post.year}-${String(post.month).padStart(2, '0')}`;
    if (!monthlyTrend[key]) {
      monthlyTrend[key] = { total: 0, solved: 0 };
    }
    monthlyTrend[key].total++;
    if (post.status === 'SOLVED') {
      monthlyTrend[key].solved++;
    }
  });

  const sortedMonths = Object.entries(monthlyTrend)
    .sort((a, b) => a[0].localeCompare(b[0]));

  sortedMonths.forEach(([month, { total, solved }]) => {
    const rate = ((solved / total) * 100).toFixed(1);
    const bar = '█'.repeat(Math.floor(total / 5));
    console.log(`  ${month}: ${bar} ${total} posts (${rate}% solved)`);
  });

  // 5. Unanswered posts requiring attention
  console.log('\n\nRecent Unanswered Posts (Top 10):');
  const unanswered = data.posts
    .filter(p => p.status === 'OPEN' && p.postCount <= 2)
    .slice(0, 10);

  unanswered.forEach((post, idx) => {
    console.log(`${idx + 1}. ${post.title}`);
    console.log(`   Created: ${post.created.split('T')[0]} | Posts: ${post.postCount} | Tags: ${post.tags.join(', ')}`);
    console.log(`   ${post.url}`);
  });

  // 6. Average response time (posts with multiple responses)
  console.log('\n\nEngagement Metrics:');
  const multiResponsePosts = data.posts.filter(p => p.postCount > 1);
  const avgPostCount = multiResponsePosts.reduce((sum, p) => sum + p.postCount, 0) / multiResponsePosts.length;

  console.log(`  Total posts: ${data.posts.length}`);
  console.log(`  Posts with responses: ${multiResponsePosts.length} (${((multiResponsePosts.length / data.posts.length) * 100).toFixed(1)}%)`);
  console.log(`  Average posts per thread (with responses): ${avgPostCount.toFixed(1)}`);
  console.log(`  Overall solved rate: ${((tagStats.langchain.solved / tagStats.langchain.total) * 100).toFixed(1)}%`);

  console.log('\n\nAnalysis complete!');
}

analyzeForumData();
