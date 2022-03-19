import Country from '../countryPrototype'
import axios from 'axios'

export default {
  state: {
    currContryName: null,
    countries: [],
    topCountries: []
  },
  mutations: {
    newCountry (state, payload) {
      state.countries.push(payload)
    },
    newCountryName (state, payload) {
      state.currContryName = payload
    },
    newTopCountry (state, payload) {
      state.topCountries = payload
    }
  },
  actions: {
    newCountry ({ commit, getters }, payload) {
      commit('clearError')
       commit('setLoading', true)

      axios
        .get(`https://corona.lmao.ninja/v2/historical/${payload}?lastdays=30`)
        .then(response => {
          let data = response.data

          let labels = []
          let datasets = {}
          let cases = []
          let deaths = []
          let recoveries = []

          for (let key in data.timeline.cases) {
            labels.push(key)

            cases.push(data.timeline.cases[key])

            deaths.push(data.timeline.deaths[key])

            recoveries.push(data.timeline.recovered[key])
          }

          datasets['cases'] = cases
          datasets['deaths'] = deaths
          datasets['recoveries'] = recoveries

          let id = getters.countryId

          const country = new Country(
            id,
            data.country,
            cases[cases.length - 1],
            deaths[deaths.length - 1],
            recoveries[recoveries.length - 1],
            datasets,
            labels
          )

          commit('setLoading', false)
          commit('newCountry', country)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error.message)
          throw error
        })
    },

    newCountryName ({ commit }, payload) {
      commit('newCountryName', payload)
    },

    updateTopCountries ({ commit, dispatch }) {
      commit('clearError')
      commit('setLoading', true)

      axios
        .get(`https://corona.lmao.ninja/v2/countries?sort=active`)
        .then(response => {
          let data = response.data.slice(0, 5);

          data = data.map(country => { return country.country})
          commit('newTopCountry', data)

          for(let country of data) {
              dispatch('newCountry', country)
          }

          commit('setLoading', false)
        })
    },

   
  },

  getters: {
      country(state) {
          return state.countries.find(country => country.name === state.currContryName)
      },
      currentCountry (state) {
        return state.currContryName
      },
  
      countryId (state) {
        return state.countries.length
      },
  
      topCountries (state) {
        return state.topCountries
      }
  }
}
