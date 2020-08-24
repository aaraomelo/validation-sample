import Vue from 'vue'
import Vuex from 'vuex'

import { validationMixin } from 'vuelidate'
import { alpha, required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: {
      name: '',
      email: '',
      password: ''
    }
  },
  mutations: {
    updateField
  },

  getters: {
    getField,
    validator: (state) => new Vue({
      mixins: [validationMixin],
      computed: {
        user: () => state.user
      },
      validations: {
        user: {
          name: { required, alpha, maxLength: maxLength(30), minLength: minLength(3) },
          email: { required, email },
          password: { required, minLength: minLength(6) }
        }
      }
    }),

    errors: (state, getters) => {

      var user = {
        name: [],
        email: [],
        password: []
      }

      getters.validator.$v.user.name.$touch();
      !getters.validator.$v.user.name.maxLength && user.name.push("O nome deve ter no máximo 32 letras");
      !getters.validator.$v.user.name.minLength && user.name.push("O nome deve ter no mínimo 3 letras");
      !getters.validator.$v.user.name.alpha && user.name.push("Utilize somente letras no nome");
      !getters.validator.$v.user.name.required && user.name.push("É necessário o nome");

      getters.validator.$v.user.email.$touch();
      !getters.validator.$v.user.email.email && user.email.push("Entre com um email válido");
      !getters.validator.$v.user.email.required && user.email.push("É necessário o email");

      getters.validator.$v.user.password.$touch();
      !getters.validator.$v.user.password.minLength && user.password.push("A senha deve ter no mínimo 6 caracteres");
      !getters.validator.$v.user.password.required && user.password.push("É necessário a senha");

      return { user }
    }

  }
})

