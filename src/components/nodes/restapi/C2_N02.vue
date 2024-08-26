<template lang="">
  <v-container fluid>
    <CustomCard title="Connection">
      <span>url</span>
      <v-text-field
        :type="schema.properties.connectionURL.type"
        v-model="formData.connectionURL"
        hide-details
      ></v-text-field>
      <span>Delay(ms)</span>
      <v-text-field
        :type="schema.properties.connectionDelay.type"
        v-model="formData.connectionDelay"
        hide-details
      ></v-text-field>
      <span>Timeout</span>
      <v-text-field
        :type="schema.properties.connectionTimeout.type"
        v-model="formData.connectionTimeout"
        hide-details
      ></v-text-field>
      <span>Concurrency</span>
      <v-text-field
        :type="schema.properties.connectionConcurrency.type"
        v-model="formData.connectionConcurrency"
        hide-details
      ></v-text-field>
      <v-checkbox
        v-model="formData.connectionRedirections"
        hide-details
        label="Follow redirections"
      ></v-checkbox>
      <v-checkbox
        v-model="formData.connectionSendChunks"
        hide-details
        label="Send large data in chunks"
      ></v-checkbox>
      <span>Body Column</span>
      <v-text-field
        :type="schema.properties.connectionBodyColumn.type"
        v-model="formData.connectionBodyColumn"
        hide-details
      ></v-text-field>
      <span>SSL</span>
      <v-checkbox
        v-model="formData.sslIgnoreHostname"
        hide-details
        label="Ignore hostname mismatches"
      ></v-checkbox>
      <v-checkbox
        v-model="formData.sslTrustAll"
        hide-details
        label="Trust all certificates"
      ></v-checkbox>
    </CustomCard>
    <CustomCard title="Authentication">
      <span>Authentication Type</span>
      <v-radio-group v-model="formData.authTypeEnum" hide-details>
        <template v-for="(item, index) in schema.properties.authTypeEnum.enum" :key="index">
          <v-radio :label="item" :value="item"></v-radio>
          <CustomCard v-if="item === 'Basic'">
            <v-radio-group
              :disabled="formData.authTypeEnum !== 'Basic'"
              v-model="formData.authBasicTypeEnum"
              hide-details
            >
              <template
                v-for="(item, index) in schema.properties.authBasicTypeEnum.enum"
                :key="index"
              >
                <v-radio :label="item" :value="item"></v-radio>
                <CustomCard v-if="item === 'Token'">
                  <span>Token</span>
                  <v-text-field
                    :disabled="formData.authBasicTypeEnum !== 'Token'"
                    :type="schema.properties.authBasicToken.type"
                    v-model="formData.authBasicToken"
                    hide-details
                  ></v-text-field>
                </CustomCard>
                <CustomCard v-if="item === 'Username/Password'">
                  <span>Username</span>
                  <v-text-field
                    :disabled="formData.authBasicTypeEnum !== 'Username/Password'"
                    :type="schema.properties.authBasicUsername.type"
                    v-model="formData.authBasicUsername"
                    hide-details
                  ></v-text-field>
                  <span>Password</span>
                  <v-text-field
                    :disabled="formData.authBasicTypeEnum !== 'Username/Password'"
                    :type="schema.properties.authBasicPassword.type"
                    v-model="formData.authBasicPassword"
                    hide-details
                  ></v-text-field>
                </CustomCard>
              </template>
            </v-radio-group>
          </CustomCard>
          <CustomCard v-if="item === 'Digest'">
            <v-radio-group
              v-model="formData.authDigestTypeEnum"
              hide-details
              :disabled="formData.authTypeEnum !== 'Digest'"
            >
              <template
                v-for="(item, index) in schema.properties.authDigestTypeEnum.enum"
                :key="index"
              >
                <v-radio :label="item" :value="item"></v-radio>
                <CustomCard v-if="item === 'Token'">
                  <span>Token</span>
                  <v-text-field
                    :disabled="formData.authDigestTypeEnum !== 'Token'"
                    :type="schema.properties.authDigestToken.type"
                    v-model="formData.authDigestToken"
                    hide-details
                  ></v-text-field>
                </CustomCard>
                <CustomCard v-if="item === 'Username/Password'">
                  <span>Username</span>
                  <v-text-field
                    :disabled="formData.authDigestTypeEnum !== 'Username/Password'"
                    :type="schema.properties.authDigestUsername.type"
                    v-model="formData.authDigestUsername"
                    hide-details
                  ></v-text-field>
                  <span>Password</span>
                  <v-text-field
                    :disabled="formData.authDigestTypeEnum !== 'Username/Password'"
                    :type="schema.properties.authDigestPassword.type"
                    v-model="formData.authDigestPassword"
                    hide-details
                  ></v-text-field>
                </CustomCard>
              </template>
            </v-radio-group>
          </CustomCard>
        </template>
      </v-radio-group>
    </CustomCard>
    <CustomCard title="Proxy">
      <span>Proxy enabled status</span>
      <v-radio-group v-model="formData.proxyStatusEnum" hide-details inline>
        <v-radio
          v-for="(item, index) in schema.properties.proxyStatusEnum.enum"
          :key="index"
          :label="item"
          :value="item"
        ></v-radio>
      </v-radio-group>
      <CustomCard title="Proxy Protocol" v-if="formData.proxyStatusEnum === 'Use Proxy'">
        <v-radio-group v-model="formData.proxyProtocolEnum" hide-details inline>
          <v-radio
            v-for="(item, index) in schema.properties.proxyProtocolEnum.enum"
            :key="index"
            :label="item"
            :value="item"
          ></v-radio>
        </v-radio-group>
        <CustomCard>
          <span>Proxy Host</span>
          <v-text-field
            :type="schema.properties.proxyHost.type"
            v-model="formData.proxyHost"
            hide-details
          ></v-text-field>
          <span>Proxy Port</span>
          <v-text-field
            :type="schema.properties.proxyPort.type"
            v-model="formData.proxyPort"
            hide-details
          ></v-text-field>
          <v-checkbox
            v-model="formData.proxyAuthentication"
            hide-details
            label="Proxy host needs authentication"
          >
          </v-checkbox>
        </CustomCard>
        <CustomCard>
          <v-radio-group
            v-model="formData.proxyAuthTypeEnum"
            hide-details
            :disabled="!formData.proxyAuthentication"
          >
            <template
              v-for="(item, index) in schema.properties.proxyAuthTypeEnum.enum"
              :key="index"
            >
              <v-radio :label="item" :value="item"></v-radio>
              <CustomCard v-if="item === 'Token'">
                <span>Token</span>
                <v-text-field
                  :disabled="formData.proxyAuthTypeEnum !== 'Token'"
                  :type="schema.properties.proxyAuthToken.type"
                  v-model="formData.proxyAuthToken"
                  hide-details
                ></v-text-field>
              </CustomCard>
              <CustomCard v-if="item === 'Username/Password'">
                <span>Username</span>
                <v-text-field
                  :disabled="formData.proxyAuthTypeEnum !== 'Username/Password'"
                  :type="schema.properties.proxyAuthUsername.type"
                  v-model="formData.proxyAuthUsername"
                  hide-details
                ></v-text-field>
                <span>Password</span>
                <v-text-field
                  :disabled="formData.proxyAuthTypeEnum !== 'Username/Password'"
                  :type="schema.properties.proxyAuthPassword.type"
                  v-model="formData.proxyAuthPassword"
                  hide-details
                ></v-text-field>
              </CustomCard>
            </template>
          </v-radio-group>
        </CustomCard>
        <v-checkbox
          v-model="formData.excludeHostsFromProxy"
          hide-details
          label="Exclude hosts from proxy"
        ></v-checkbox>
        <CustomCard>
          <span>Exclude hosts</span>
          <v-text-field
            :type="schema.properties.excludedHosts.type"
            v-model="formData.excludedHosts"
            hide-details
            :disabled="!formData.excludeHostsFromProxy"
          ></v-text-field>
        </CustomCard>
      </CustomCard>
    </CustomCard>
    <CustomCard title="Error Handling">
      <span>Retry on error</span>
      <v-text-field
        :type="schema.properties.retryOnError.type"
        v-model="formData.retryOnError"
        hide-details
      ></v-text-field>
      <span>Retry delay</span>
      <v-text-field
        :type="schema.properties.retryDelay.type"
        v-model="formData.retryDelay"
        hide-details
      ></v-text-field>
    </CustomCard>
    <!-- Request Headers -->
    <CustomCard title="Request Headers">
      <span>header key</span>
      <v-text-field
        :type="schema.properties.requestHeaderKey.type"
        v-model="formData.requestHeaderKey"
        hide-details
        @update:modelValue="updateSelectedItem('requestHeaders', 'key', $event)"
      ></v-text-field>
      <span>header value</span>
      <v-text-field
        :type="schema.properties.requestHeaderValue.type"
        v-model="formData.requestHeaderValue"
        hide-details
        @update:modelValue="updateSelectedItem('requestHeaders', 'value', $event)"
      ></v-text-field>
      <CustomTableWithAddItems
        :headers="['key', 'value']"
        :selectedItem="selectedItems.requestHeaders"
        v-model="formData.requestHeaderArrayObject"
      ></CustomTableWithAddItems>
    </CustomCard>

    <!-- Response Headers -->
    <CustomCard title="Response Headers">
      <span>header key</span>
      <v-text-field
        :type="schema.properties.responseHeaderKey.type"
        v-model="formData.responseHeaderKey"
        hide-details
        @update:modelValue="updateSelectedItem('responseHeaders', 'key', $event)"
      ></v-text-field>
      <span>header value</span>
      <v-text-field
        :type="schema.properties.responseHeaderValue.type"
        v-model="formData.responseHeaderValue"
        hide-details
        @update:modelValue="updateSelectedItem('responseHeaders', 'value', $event)"
      ></v-text-field>
      <CustomTableWithAddItems
        :headers="['key', 'value']"
        :selectedItem="selectedItems.responseHeaders"
        v-model="formData.responseHeaderArrayObject"
      ></CustomTableWithAddItems>
    </CustomCard>

    <!-- Content Body -->
    <CustomCard title="Content Body">
      <span>body key</span>
      <v-text-field
        :type="schema.properties.contentBodyKey.type"
        v-model="formData.contentBodyKey"
        hide-details
        @update:modelValue="updateSelectedItem('contentBody', 'key', $event)"
      ></v-text-field>
      <span>body value</span>
      <v-text-field
        :type="schema.properties.contentBodyValue.type"
        v-model="formData.contentBodyValue"
        hide-details
        @update:modelValue="updateSelectedItem('contentBody', 'value', $event)"
      ></v-text-field>
      <CustomTableWithAddItems
        :headers="['key', 'value']"
        :selectedItem="selectedItems.contentBody"
        v-model="formData.contentBodyArrayObject"
      ></CustomTableWithAddItems>
    </CustomCard>
  </v-container>
</template>
<script>
import CustomCard from '@/components/custom/CustomCard.vue'
import formMixin from '@/components/mixins/formMixin'
import CustomTableWithAddItems from '@/components/custom/CustomTableWithAddItems.vue'
export default {
  name: 'C2_N02',
  components: {
    CustomCard,
    CustomTableWithAddItems
  },
  mixins: [formMixin],
  data() {
    return {
      selectedItems: {
        requestHeaders: { key: '', value: '' },
        responseHeaders: { key: '', value: '' },
        contentBody: { key: '', value: '' }
      }
    }
  }
}
</script>
<style scoped>
.selected-row {
  background-color: lightgray;
}
</style>
