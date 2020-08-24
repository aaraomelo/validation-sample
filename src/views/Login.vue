<template>
  <div>
    <v-app id="inspire" dark>
      <v-card >
      <form class="ma-2">

        <v-text-field
          label="Nome"
          v-model="name"
          :error-messages="errors.user.name"
        ></v-text-field>

        <v-text-field
          label="Email"
          v-model="email"
          :error-messages="errors.user.email"
        ></v-text-field>

        <v-text-field
          label="Senha"
          v-model="password"
          :error-messages="errors.user.password"
        ></v-text-field>
         <v-btn> submit </v-btn>
      </form>

      </v-card>
    </v-app>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapFields([
      'user.name',
      'user.email',
      'user.password'
    ]),
    ...mapGetters(['errors'])
  }
}

</script>