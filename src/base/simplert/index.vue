<template>
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
</template>

<script>
import Simplert from 'vue2-simplert'
export default {
    components:{
        Simplert
    },
    methods:{
        _successTips() {
            let obj = {
                title: '标题',
                type: 'success',
                onClose: this._onClose,
                customCloseBtnText:'关闭'
            }
            this.$refs.simplert.openSimplert(obj)
        },
        _warnTips(message) {
            let obj = {
                message,
                type: 'warning',
                customCloseBtnText:'关闭'
            }
            this.$refs.simplert.openSimplert(obj)
        },
        _errorTips(message) {
            let obj = {
                message,
                type: 'error',
                customCloseBtnText:'关闭'
            }
            this.$refs.simplert.openSimplert(obj)
        },
    }
}
</script>

<style>

</style>
