<template lang="jade">
.app-view
    router-view.view(keep-alive transition transition-mode="out-in")
</template>

<script lang="babel">
export default {
    data: function () {
        console.log('CREATING APP');
        return { name: 'ADAM' };
    }
}
</script>