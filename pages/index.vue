<script setup lang="ts">


const form = ref({
    id: '',
    content: '',
    urls: [''],
    importance: 'その他相談',
    reply: '要返答',
    moderator: '誰でも',
});

const webhookURL = `https://discord.com/api/webhooks/1329013057447399475/W9ttkpu6Eli8CrQolcNbwRpVx1q5RU6Ii5QIkImfrk-gH7lLbEOZ3FtkKS6wwuFJRPQs`;

const isModalVisible = ref(false);
const urlErrors = ref<string[]>([]);
const isConfirmationModalVisible = ref(false);
const isRequiredModalVisible = ref(false);

const contentError = computed(() => form.value.content.length > 3500 ? '文字数は3500文字以内でご記入ください。' : '');

function addUrl() {
    form.value.urls.push('');
    urlErrors.value.push('');
}

function removeUrl(index: number) {
    if (form.value.urls.length > 1) {
        form.value.urls.splice(index, 1);
        urlErrors.value.splice(index, 1);
    }
}

function validateUrls() {
    const urlPattern = RegExp('^(https?:\\/\\/)?'+
                           '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}'+
                           '(\\/[-a-z\\d%_.~+]*)*', 'i');

    urlErrors.value = form.value.urls.map(url => urlPattern.test(url) ? '' : 'URL形式が正しくありません');
    return urlErrors.value.every(error => error === '');
}

async function submitForm() {
    if (!form.value.id || !form.value.importance || !form.value.reply || !form.value.content) {
        isRequiredModalVisible.value = true;
        return;
    }

    if (form.value.content.length > 3500) {
        return;
    }

    if (!validateUrls() && !form.value.content.includes('http')) {
        isConfirmationModalVisible.value = true;
        return;
    }

    sendForm();
}

function confirmSend() {
    isConfirmationModalVisible.value = false;
    sendForm();
}

function cancelSend() {
    isConfirmationModalVisible.value = false;
}

async function sendForm() {
    const payload = {
        // テスト用：吉川に通知が飛ぶ
        // content: '<@1030054142137352252>',
        // 本番用：モデレーターに通知が飛ぶ
        content: form.value.content + '\n<@&1314282270563237939>',
        embeds: [
            {
                title: "通報内容",
                fields: [
                    // { name: "相談内容", value: form.value.content || "未入力", inline: false },
                    { name: "ID", value: form.value.id || "未入力", inline: true },
                    { name: "重要度", value: form.value.importance || "未入力", inline: true },
                    { name: "返答", value: form.value.reply || "未入力", inline: true },
                    { name: "返答希望モデレーター", value: form.value.moderator || "未入力", inline: true },
                ],
            },
        ],
    };

    const { data, error } = await useFetch(webhookURL, {
        method: 'POST',
        body: payload,
    });

    if (error.value) {
        console.error('Error sending data:', error.value);
    } else {
        console.log('Data sent successfully:', data.value);
        isModalVisible.value = true;
    }
}

function closeModal() {
    isModalVisible.value = false;
}

function adjustTextareaHeight() {
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        const maxHeight = parseInt(getComputedStyle(textarea).lineHeight) * 20; // 20行分の高さ
        textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
}

function closeRequiredModal() {
    isRequiredModalVisible.value = false;
}

</script>
<template lang="pug">
.page
    .heading.gutter.block-distance
        h1 AI和解派 公式ポータル
    .links.gutter.block-distance
        h2 リンク集
        ul.links-list
            li
                a(href="https://genai.miraheze.org/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8").links-button
                    Icon(name='ooui:logo-meta-wiki').icon
                    p 公式Wiki
            li
                a(href="https://discord.gg/gXy73z9M").links-button.discord
                    Icon(name="ic:sharp-discord").icon
                    p Discord
    .form.gutter.block-distance
        .form_heading
            Icon(name='material-symbols:mail' size="1.618rem").icon
            h2 通報・連絡フォーム
        .form_input
            label(for="id") あなたのXアカウントID(必須)
            input(type="text" placeholder="wakaiha" v-model="form.id")
        .form_input
            label(for="content") 相談内容(必須)<br>
                span ※運営にわかりやすいようにご記入ください。
            textarea(type="text" placeholder="相談内容を記入してください" v-model="form.content" @input="adjustTextareaHeight" ref="textarea" style="overflow-y: auto;" maxlength="3500")
        span.error(v-if="contentError") {{ contentError }}
        .form_input
            label(for="importance") 重要度(必須)
            select(name="importance" v-model="form.importance")
                option(value="その他相談") その他相談
                option(value="気になる") 気になる
                option(value="至急要請") 至急要請
        .form_input
            label(for="reply") 運営からの返答を求めますか？(必須)
            select(name="reply" v-model="form.reply")
                option(value="要返答") 求めません
                option(value="返答不要") 求めます
        .form_input(v-if="form.reply != '要返答'")
            label(for="moderator") 返答希望モデレーター
            select(name="moderator" v-model="form.moderator")
                option(value="誰でも") 誰でも
                option(value="吉川飛空") 吉川飛空
                option(value="棄印きう") 棄印きう
                option(value="46Rb") 46Rb
                option(value="ナチュレ") ナチュレ
                option(value="La") La

        .form_button
            button(@click="submitForm") 送信

    .modal(v-if="isModalVisible")
        .modal-content
            p 送信が完了しました。
            button(@click="closeModal") 閉じる

    .modal(v-if="isConfirmationModalVisible")
        .modal-content
            p URLが含まれていませんが、本当に送信しますか？
            .choices
                button(@click="confirmSend") 送信
                button(@click="cancelSend").cancelButton キャンセル

    .modal(v-if="isRequiredModalVisible")
        .modal-content
            p 必須項目を入力してください。
            button(@click="closeRequiredModal") 戻る

</template>

<style scoped lang="sass">
@use "@osaxyz/universtyle" as osa
@use "@osaxyz/mediaquery" as *

$accent-color: #FF5733
$primary-color: #ab60a4

.heading
    font-size: 2.618rem
    font-weight: bold
    @include mq(iPadPro)
        font-size: 1.618rem

.block-distance
    margin-block-end: 4.4rem
.page
    padding-block: 5rem
    h2
        font-size: 1.618rem
        font-weight: bold
        padding-block: 2rem
.links
    &-list

        display: flex
        flex-flow: row wrap
        justify-content: space-between
        align-items: center
        gap: 2rem
        @include mq(iPadPro)
            flex-flow: column wrap
            gap: 2rem
        li
            width: 45%
            @include mq(iPadPro)
                width: 100%

    &-button
        border-radius: 12px
        padding: 1rem
        background-color: var(--primary)
        color: var(--bg)
        font-weight: bold
        font-size: 1.618rem
        display: flex
        flex-flow: row wrap
        justify-content: center
        align-items: center
        gap: 1rem
        width: 100%
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.4)
.form
    &_heading
        display: flex
        flex-flow: row wrap
        justify-content: flex-start
        align-items: center
        gap: 1rem
    &_input
        display: flex
        flex-flow: column wrap
        justify-content: flex-start
        align-items: flex-start
        gap: 0.44rem
        margin-block-end: 1.24rem
        label
            span
                font-size: 0.8rem
                color: red
        input, textarea
            border-radius: 6px
            border: 1px solid var(--accent)
            padding: 0.618rem
            width: 100%
        select
            appearance: none
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path fill="none" stroke="black" stroke-width="1" d="M0 3l5 5 5-5"/></svg>')
            background-repeat: no-repeat
            background-position: right 0.5rem center
            background-size: 10px 10px
            background-color: adjust(white, 10%)
            border-radius: 6px
            border: 1px solid var(--accent)
            padding: 0.618rem
            width: 100%
    &_button
        button
            background-color: var(--accent)
            color: var(--bg)
            font-weight: bold
            font-size: 1.24rem
            padding: 1rem 3.6rem
            border-radius: 8px
            border: none
            cursor: pointer
            transition: background-color 0.3s, transform 0.2s
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
            @include mq(iPadPro)
                width: 100%
                text-align: center

            &:hover
                background-color: adjust($accent-color, 10%)
                box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15)

            &:active
                background-color: adjust($accent-color, 15%)
                transform: translateY(2px)
                box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2)

.icon
    object-fit: cover
.discord
    background-color: #5865F2

.add-button, .remove-button
    background-color: var(--primary)
    color: var(--bg)
    border: none
    border-radius: 4px
    width: 2rem
    height: 2rem
    padding-inline: 2rem
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: background-color 0.3s

    &:hover
        background-color: darken($primary-color, 10%)

    &:active
        background-color: darken($primary-color, 15%)
        transform: translateY(1px)

.url
    &-input
        width: 100%
    &-list
        display: flex
        flex-flow: column nowrap
        justify-content: flex-start
        align-items: flex-start
        gap: 0.44rem
        li
            width: 100%
    &_buttons
        display: flex
        flex-flow: row wrap
        justify-content: flex-start
        align-items: center
        gap: 0.44rem

.modal
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center

.modal-content
    background-color: white
    padding: 2rem
    border-radius: 8px
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
    text-align: center
    button
        margin-block-start: 0.24rem
        background-color: var(--primary)
        color: var(--bg)
        font-weight: bold
        font-size: 1.24rem
        padding: 0.618rem 1.24rem
        border-radius: 6px
        border: none
        cursor: pointer
        transition: background-color 0.3s, transform 0.2s
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

textarea
    min-height: calc(1.5em * 10) // 10行分の高さ
    max-height: calc(1.5em * 20) // 20行分の高さ
    overflow-y: auto
.choices
    display: flex
    flex-flow: row wrap
    justify-content: center
    align-items: center
    gap: 0.44rem
    button
        margin-block-start: 0.4rem
.cancelButton
    background-color: #acd2aa
    color: var(--bg)

.error
    color: red
    font-size: 0.8rem
</style>


