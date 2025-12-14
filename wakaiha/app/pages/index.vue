<template>
  <div>
    <UPageHero
      title="AI和解派"
      description="立場の異なる、対話の通じるもの同士が和解する。2024年、芸術家・吉川飛空によって立ち上がったコミュニティです。"
      :links="[{
        label: 'Discord(いる？)',
        to: '#discord',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: '公式Wikiを見る(まだ)',
        to: '#wiki',
        icon: 'i-lucide-book-open',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <AnimatedSection
      id="rules"
      title="コミュニティルール"
      description="「全体の和解」を目指すための3つの基本原則"
      gradient-from="from-blue-500/30"
      gradient-to="to-cyan-500/30"
      :features="[{
        icon: 'i-lucide-heart-handshake',
        title: '1. 非暴力的コミュニケーションを徹底する',
        description: '人は文脈が欠如している時、自身の信念を侵害されたと感じている時、相手が身内でないとき、暴力的なコミュニケーションを採ることがあります。それを理解し、どのような発言にも当人のこころがあることを受け止め、対話で「全体の和解」を目指しましょう。'
      }, {
        icon: 'i-lucide-users',
        title: '2. メンバーの立場が違うことを歓迎する',
        description: '「全体の和解」を目指すコミュニティの構成員の思想が一様だったらそれはカルトです。多様なメンバーを持つコミュニティのみが説得力を持ちます。相手の意見を認める必要はありません。ただし、意見が異なること自体が最も健全な状態です。'
      }, {
        icon: 'i-lucide-message-circle-heart',
        title: '3. ミスをした場合は迅速に謝罪する',
        description: '対話は難しい作業で、相手に合わせて言葉を選ぶ必要があります。事実と共感のバランスを維持する努力をしている人間ならば、謝罪は立場を悪化させません。人はミスります。その時は迅速にこちらから謝りましょう。'
      }]"
    />

    <AnimatedSection
      id="principles"
      title="細則"
      description="コミュニティ運営の方針"
      gradient-from="from-violet-500/30"
      gradient-to="to-purple-500/30"
      :features="[{
        icon: 'i-lucide-scale',
        title: '和解と秩序の定義',
        description: '和解の定義は「創設者以外で形成するもの」、秩序も「創設者以外で獲得する」と定めています。創設者は「全体の和解」と「秩序」を刺激する役割を持ちます。'
      }, {
        icon: 'i-lucide-shield',
        title: 'コミュニティ内のみ適用',
        description: 'コミュニティルールはコミュニティ内にしか適用されません。外部の行動はコミュニティでの評価に影響を及ぼしません。コミュニティ外でも行動を強制すると、それは悪質な活動団体に変わるからです。'
      }, {
        icon: 'i-lucide-gavel',
        title: '創設者の権限',
        description: '規約上コミュニティは創設者の所有物です。しかし、X規約など上位の規則の違反や、受忍限度を超えるコミュニティの停滞を除き、基本的にその権利を行使しません。'
      }]"
    />

    <AnimatedSection
      id="dissolution"
      title="解散条件"
      description="コミュニティが終了する条件"
      gradient-from="from-amber-500/30"
      gradient-to="to-orange-500/30"
      :features="[{
        icon: 'i-lucide-equal',
        title: '思想の一様化',
        description: 'アクティブメンバー全員の立場が一様になり、4週間のうち20日以上連続して分布が変わらなかった場合'
      }, {
        icon: 'i-lucide-sparkles',
        title: 'アウフヘーベンの達成',
        description: 'コミュニティ外部で明確なアウフヘーベン（止揚）が起こった場合'
      }, {
        icon: 'i-lucide-alert-triangle',
        title: '不可抗力',
        description: '創設者が生命・財産などに関係する明確な脅迫を受けた場合、その他の不可抗力'
      }]"
    />

    <UPageSection class="pb-24">
      <UPageCTA
        title="AI和解派に参加しませんか？"
        description="立場が異なっても、対話を通じて理解し合えるコミュニティを一緒に作りましょう。"
        variant="subtle"
        :links="[{
          label: 'Discordに参加する',
          to: '#discord',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral'
        }]"
      />
    </UPageSection>
  </div>
</template>
