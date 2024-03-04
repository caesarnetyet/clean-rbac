<template>
Login Works!

  <form @submit.prevent="login">
    <div>
      <input v-model.trim="email" type="text" placeholder="email" />
      <span v-if="errors['email']">{{ errors['email'][0] }}</span>
    </div>
    <div>
      <input v-model.trim="password" type="password" placeholder="password" />
      <span v-if="errors['password']">{{ errors['password'][0] }}</span>
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts" setup>

const { useLogin } = useAuth()

const email = ref('')
const password = ref('')

const errors = ref<APIErrors>(new Map())

const login = async () => {
  const authErrors = await useLogin(email.value, password.value)
  if (authErrors) {
    errors.value = authErrors
  }
}

</script>
