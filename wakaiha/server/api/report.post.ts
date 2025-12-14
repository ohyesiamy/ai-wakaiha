export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const webhookUrl = config.discordWebhookUrl

  if (!webhookUrl) {
    throw createError({
      statusCode: 500,
      message: 'Discord webhook URLが設定されていません'
    })
  }

  const body = await readBody(event)

  // Validate input
  if (!body.reporterId?.trim()) {
    throw createError({
      statusCode: 400,
      message: '自分のIDを入力してください'
    })
  }

  if (!body.targetId?.trim()) {
    throw createError({
      statusCode: 400,
      message: '通報相手のIDを入力してください'
    })
  }

  if (!body.content?.trim()) {
    throw createError({
      statusCode: 400,
      message: '通報内容を入力してください'
    })
  }

  if (body.content.length < 10) {
    throw createError({
      statusCode: 400,
      message: '通報内容は10文字以上で入力してください'
    })
  }

  // Truncate content if too long (Discord field limit is 1024 chars)
  const truncatedContent = body.content.trim().length > 1000
    ? body.content.trim().substring(0, 1000) + '...'
    : body.content.trim()

  // Create Discord embed
  const embed = {
    title: '🚨 新しい通報',
    color: 0xef4444, // Red color
    fields: [
      {
        name: '📝 通報者ID',
        value: body.reporterId.trim() || '不明',
        inline: true
      },
      {
        name: '🎯 通報対象ID',
        value: body.targetId.trim() || '不明',
        inline: true
      },
      {
        name: '📋 通報内容',
        value: truncatedContent || '内容なし'
      }
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'AI和解派 通報システム'
    }
  }

  // Create thread name for forum channel
  const threadName = `通報: ${body.targetId.trim()} (${new Date().toLocaleDateString('ja-JP')})`

  try {
    const response = await $fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        thread_name: threadName,
        embeds: [embed]
      }
    })

    return {
      success: true,
      message: '通報を受け付けました'
    }
  } catch (error: any) {
    console.error('Discord webhook error:', error?.data || error?.message || error)
    console.error('Request body was:', JSON.stringify({ embeds: [embed] }, null, 2))
    throw createError({
      statusCode: 500,
      message: 'Discordへの送信に失敗しました。しばらく経ってから再度お試しください。'
    })
  }
})
