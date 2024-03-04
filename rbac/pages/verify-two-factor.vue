<template>

  <form @submit.prevent="sendTwoFactor">
    <div>
      <input v-model.trim="token" type="text" placeholder="code" />
      <span v-if="errMsg">{{ errMsg }}</span>
    </div>
    <button type="submit">Verify</button>
  </form>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
const errMsg = ref('')

const token = ref('')
const route = useRoute()
const { url } = route.query
const router = useRouter()



const sendTwoFactor = async () => {
  if (typeof url !== 'string') return
  console.log(url)

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ token: token.value })
  })

  const data = await res.json()

  if (!res.ok) {
    errMsg.value = data.message
    return
  }

  console.log('Two factor verified')
  localStorage.setItem('token', data.token)
  // Redirect to dashboard
  await router.push({ name: 'dashboard' })

}
</script>