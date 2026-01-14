/**
 * Test script for streaming RAG API
 *
 * Usage: node test-streaming.js
 */

async function testStreamingAPI() {
  console.log('Testing Streaming RAG API...\n')

  const query = 'What are the most common LangSmith authentication errors?'
  console.log(`Query: "${query}"\n`)

  try {
    const response = await fetch('http://localhost:3002/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        stream: true
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let buffer = ''
    let sources = []
    let fullAnswer = ''

    console.log('=== STREAMING RESPONSE ===\n')

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)

          if (data === '[DONE]') {
            console.log('\n\n=== STREAM COMPLETE ===\n')
            break
          }

          try {
            const parsed = JSON.parse(data)

            if (parsed.type === 'sources') {
              sources = parsed.sources
              console.log('📚 Sources received:', sources.length)
              sources.forEach((source, idx) => {
                console.log(`  ${idx + 1}. ${source.title} (${source.relevanceScore?.toFixed(2)})`)
              })
              console.log('\n💬 Answer:\n')
            } else if (parsed.type === 'chunk') {
              process.stdout.write(parsed.content)
              fullAnswer += parsed.content
            } else if (parsed.type === 'error') {
              console.error('\n❌ Error:', parsed.message)
            }
          } catch (parseError) {
            console.error('Parse error:', parseError)
          }
        }
      }
    }

    console.log('\n\n=== TEST RESULTS ===')
    console.log(`✓ Sources: ${sources.length}`)
    console.log(`✓ Answer length: ${fullAnswer.length} characters`)
    console.log(`✓ Streaming: SUCCESS`)

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testStreamingAPI()
