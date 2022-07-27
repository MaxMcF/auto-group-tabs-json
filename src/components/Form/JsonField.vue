<template>
    <div>
        <mwc-textarea rows="20" ref="textarea" fullwidth v-bind="$attrs" :value="modelValue" @input="
            emit('update:modelValue', $event.target.value), emit('input', $event)
        " @change="onChange" @focus="emit('focus', $event)" @blur="emit('blur', $event)"
            :validityTransform.prop="validityTransform" />
        <div class="invalid-matcher" v-if="isInvalid" v-html="validationMessage" />
    </div>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'


const props = defineProps<{
    modelValue: string
    validationMessage?: string
    validator?: (value: string) => boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
    (e: 'input', event: InputEvent): void
    (e: 'change', event: Event): void
    (e: 'focus', event: FocusEvent): void
    (e: 'blur', event: FocusEvent): void
}>()

const isInvalid = ref(false)
const textarea = ref()

const validityTransform = computed(() =>
    props.validator
        ? (value: string, nativeValidity: ValidityState) => {
            const customValidationResult = props.validator!(value)
            if (!customValidationResult) {
                return {
                    valid: false,
                    customError: true
                }
            }

            return {}
        }
        : undefined
)

onBeforeUnmount(() => {
    delete textarea.value.validityTransform
})

function onChange(event: Event) {
    isInvalid.value = !isValid()
    emit('change', event)
}

function isValid() {
    return textarea.value?.checkValidity()
}

function blur() {
    textarea.value.blur()
}

function focus() {
    textarea.value.focus()
}

function select() {
    textarea.value.select()
}

function validate() {
    isInvalid.value = !isValid()
    textarea.value.reportValidity()
}

defineExpose({
    blur,
    focus,
    select,
    isValid,
    validate
})

onMounted(() => {
    nextTick(() => {
        isInvalid.value = !isValid()
        textarea.value.reportValidity()
    })
})
</script>

<style lang="scss" scoped>
.ui-textarea {
    width: 100%;
    height: 100%;
}

mwc-textarea {
    width: 100%;
    height: 95%;
    border-radius: var(--mdc-shape-small, 4px);
}
</style>
