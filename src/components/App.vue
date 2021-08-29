<template>
    <div class="app">
        <div class="sheet p-4">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            hoge: "fufunfun"
        };

    },
    mounted: function(){
        document.body.classList.add('A4');
    },
    destroyed: function(){
        document.body.classList.remove('A4');
    }
}
</script>

<style lang="postcss" scoped>
@page{size:A4}
</style>