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

// Tag keywords to search for in titles
const TAG_KEYWORDS = {
  langsmith: ['langsmith', 'lang smith'],
  langgraph: ['langgraph', 'lang graph'],
  langchain: ['langchain', 'lang chain'],
  deployment: ['deployment', 'deploy', 'deploying'],
  auth: ['auth', 'authentication', 'authorization'],
  tracing: ['tracing', 'trace', 'traces'],
  cloud: ['cloud'],
  api: ['api'],
  experiment: ['experiment', 'evaluation', 'eval'],
  agent: ['agent', 'agents'],
  middleware: ['middleware'],
  tool: ['tool', 'tools'],
  error: ['error', 'errors', 'bug'],
};

// Status keywords to determine if a post is solved
const SOLVED_KEYWORDS = [
  'solved',
  'resolved',
  'working',
  'fixed',
  'thank you isaac',
  'thank you',
  'thanks isaac',
  'thanks for the assistance',
  'our build is now working',
  'this is now working',
  'issue resolved',
  'problem solved',
];

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  function traverse(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md') {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

function extractTopicId(content: string): string {
  const match = content.match(/\*\*Topic ID:\*\*\s*(\d+)/);
  return match ? match[1] : '';
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function extractCreated(content: string): string {
  const match = content.match(/\*\*Created:\*\*\s*(.+)/);
  if (match) {
    const dateStr = match[1].trim();
    // Convert to ISO format
    return new Date(dateStr).toISOString();
  }
  return '';
}

function extractUrl(content: string): string {
  const match = content.match(/\*\*URL:\*\*\s*(.+)/);
  return match ? match[1].trim() : '';
}

function extractTags(title: string, content: string): string[] {
  const tags: Set<string> = new Set();
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword) || lowerContent.includes(keyword)) {
        tags.add(tag);
        break; // Move to next tag once we find a match
      }
    }
  }

  return Array.from(tags).sort();
}

function determineStatus(content: string): 'SOLVED' | 'OPEN' {
  const lowerContent = content.toLowerCase();

  for (const keyword of SOLVED_KEYWORDS) {
    if (lowerContent.includes(keyword)) {
      return 'SOLVED';
    }
  }

  return 'OPEN';
}

function countPosts(content: string): number {
  const matches = content.match(/##\s+Post\s+#\d+/g);
  return matches ? matches.length : 0;
}

function parseMarkdownFile(filePath: string): ForumPost | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    const topicId = extractTopicId(content);
    const title = extractTitle(content);
    const created = extractCreated(content);
    const url = extractUrl(content);
    const tags = extractTags(title, content);
    const status = determineStatus(content);
    const postCount = countPosts(content);

    if (!topicId || !title || !created) {
      console.warn(`Warning: Missing required fields in ${filePath}`);
      return null;
    }

    const createdDate = new Date(created);

    return {
      topicId,
      title,
      created,
      url,
      tags,
      status,
      postCount,
      year: createdDate.getFullYear(),
      month: createdDate.getMonth() + 1, // 1-indexed month
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

function main() {
  const forumDir = '/Users/jihyunjeong/Documents/Github/langchain/forum';
  const outputPath = '/Users/jihyunjeong/Documents/Github/langchain/data/forum-parsed.json';

  console.log('Starting forum data parsing...');
  console.log(`Scanning directory: ${forumDir}`);

  // Get all markdown files
  const markdownFiles = getAllMarkdownFiles(forumDir);
  console.log(`Found ${markdownFiles.length} markdown files`);

  // Parse each file
  const posts: ForumPost[] = [];
  let successCount = 0;
  let failCount = 0;

  for (const filePath of markdownFiles) {
    const post = parseMarkdownFile(filePath);
    if (post) {
      posts.push(post);
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\nParsing complete:`);
  console.log(`  Successfully parsed: ${successCount}`);
  console.log(`  Failed to parse: ${failCount}`);

  // Sort posts by created date (newest first)
  posts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  // Calculate date range
  const dates = posts.map(p => new Date(p.created).getTime()).sort((a, b) => a - b);
  const earliest = dates.length > 0 ? new Date(dates[0]).toISOString() : '';
  const latest = dates.length > 0 ? new Date(dates[dates.length - 1]).toISOString() : '';

  // Create output object
  const output: ParsedData = {
    posts,
    totalPosts: posts.length,
    dateRange: {
      earliest,
      latest,
    },
  };

  // Write to file
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\nOutput written to: ${outputPath}`);

  // Print summary statistics
  console.log('\n=== SUMMARY STATISTICS ===');
  console.log(`Total posts: ${output.totalPosts}`);
  console.log(`Date range: ${earliest.split('T')[0]} to ${latest.split('T')[0]}`);

  // Status breakdown
  const solvedCount = posts.filter(p => p.status === 'SOLVED').length;
  const openCount = posts.filter(p => p.status === 'OPEN').length;
  console.log(`\nStatus breakdown:`);
  console.log(`  SOLVED: ${solvedCount} (${((solvedCount / posts.length) * 100).toFixed(1)}%)`);
  console.log(`  OPEN: ${openCount} (${((openCount / posts.length) * 100).toFixed(1)}%)`);

  // Tag breakdown
  const tagCounts: Record<string, number> = {};
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  console.log(`\nTop tags:`);
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  sortedTags.forEach(([tag, count]) => {
    console.log(`  ${tag}: ${count}`);
  });

  // Monthly breakdown
  const monthlyBreakdown: Record<string, number> = {};
  posts.forEach(post => {
    const key = `${post.year}-${String(post.month).padStart(2, '0')}`;
    monthlyBreakdown[key] = (monthlyBreakdown[key] || 0) + 1;
  });

  console.log(`\nMonthly breakdown (most recent 6 months):`);
  const sortedMonths = Object.entries(monthlyBreakdown)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 6);

  sortedMonths.forEach(([month, count]) => {
    console.log(`  ${month}: ${count} posts`);
  });

  console.log('\nDone!');
}

main();
