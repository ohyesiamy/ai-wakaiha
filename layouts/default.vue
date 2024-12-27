<script setup lang ="ts">

</script>

<template lang="pug">
.layout
    .header
        h1 AI和解派 公式ポータルフォーム
    slot
    .footer
</template>

<style scoped lang="sass">
@use "@osaxyz/universtyle" as osa
@use "@osaxyz/mediaquery" as *
.header
    background-color: var(--primary)
    height: 50px
    color: var(--bg)
    padding-inline: 20px
    display: flex
    align-items: center
    justify-content: space-between
    font-size: 1.2rem
    font-weight: bold
    border-bottom: 1px solid var(--bg)

</style>
