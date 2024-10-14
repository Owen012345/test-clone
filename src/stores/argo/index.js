import states from './state'
const state = states
const mutations = {
  UPDATE_CONTAINER_TEMPLATE(state, data) {
    const { name, metadata } = data

    state.containerTemplatesList = state.containerTemplatesList.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          container: {
            ...item.container,
            image:
              metadata.address && metadata.version
                ? `${metadata.address}:${metadata.version}`
                : item.container.image
          }
        }
      }

      return item
    })
  },
  REMOVE_CONTAINER_TEMPLATE(state, name) {
    state.containerTemplatesList = state.containerTemplatesList.filter((item) => item.name !== name)
  },
  INIT_CONTAINER_TEMPLATE(state, data) {
    const { name, group } = data

    state.containerTemplatesList.push({
      ...state.containerTemplate[group],
      name: name
    })
  }
}
const getters = {
  getContainerTemplates: (state) => {
    return state.containerTemplatesList
  }
}
const actions = {}

export default { namespaced: true, state, mutations, actions, getters }
