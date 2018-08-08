<template>
  <div class="g-bd">
    <wxhd></wxhd>
    <wxdesc></wxdesc>
    <wxlist></wxlist>
    <wxqrcode></wxqrcode>
    <wxft></wxft>
  </div>
</template>

<script>
import wxhd from 'base/Header/Header'
import wxft from 'base/Footer/Footer'
import wxdesc from 'base/Desc/Desc'
import wxqrcode from 'base/Qrcode/Qrcode'
import wxlist from 'comp/List/List'
export default {
  components: {
    wxhd,
    wxft,
    wxdesc,
    wxqrcode,
    wxlist
  }
}
</script>

<style>

</style>
