<template>
    <div class="app">
        <section class="sheet padding-10mm">
            <draggable class="flex gap-4 flex-wrap" v-model="items" handle=".-handle">
                <div class="item-card -handle" v-for="(item,index) in items" :key="index">
                    <div class="title text-center">{{item.name}}</div>
                    <div class="code mt-2 relative h-[20mm] w-full overflow-hidden">
                        <div class="absolute font-barcode text-[30mm] w-full bottom-0 text-center">
                            {{item.code}}
                        </div>
                    </div>
                    <div class="removeme absolute top-0 right-0 ">
                        <div @click="removeAt(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
                        </div>
                    </div>
                    <div class="editme absolute top-0 left-0">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
                        </div>
                    </div>
                </div>
                <div class="item-card -addnew" @focusin="input_active = true" :class="{'-active': input_active, '-inactive': !input_active}" 
                    tabindex="1" 
                    >
                    <form :class="{'hidden':!input_active}">
                        <div class="text-center w-full py-2 bg-blue-400">新しい商品の追加</div>
                        <label for="product">商品名</label>
                        <input class="w-full px-2 border rounded" type="text" name="product" id="product" v-model="input_product">
                        <label for="code">JANコード</label>
                        <input class="w-full px-2 border rounded" type="text" name="code" id="code" v-model="input_code">
                        <div class="flex w-full">
                            <button class="w-full hover:opacity-70 hover:ring" @click.prevent="addNewItem">Add</button>
                            <button class="w-full hover:opacity-70 hover:ring" @click.prevent.stop="input_active = false">Close</button>
                        </div>
                    </form>
                    <div :class="{'hidden':input_active}" class="addbutton h-full flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
</svg>
                    </div>
                </div>
            </draggable>


            <button class="absolute px-4 py-2 bg-blue-500 text-white rounded-lg shadow right-0 bottom-10 print:invisible"
                    @click="clearItems">
                クリア
            </button>
        </section>

    </div>
</template>

<script>
const draggable = require('vuedraggable');

export default {
    components:{
        draggable,
    },
    data(){
        return {
            items: [],
            input_product:"",
            input_code:"",
            input_active:false,
        };

    },
    methods:{
        addNewItem(){
            this.items.push({name:this.input_product,code: this.input_code});
            this.resetForm();
        },
        resetForm(){
            this.input_product="";
            this.input_code="";
        },
        clearItems(){
            this.items=[];
        },
        removeAt(index){
            this.items.splice(index,1);
        }
    },
    mounted: function(){
        document.body.classList.add('A4');

        if (localStorage.items){
            console.log("mounted ...",localStorage.items);
            this.items = JSON.parse(localStorage.items);
        }
    },
    watch:{
        items: function(newArray){
            console.log("watch ..",newArray);
            localStorage.items = JSON.stringify(newArray);
        }
    },
    destroyed: function(){
        document.body.classList.remove('A4');
    }
}
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+EAN13+Text&family=Noto+Sans+JP:wght@100;400;900&display=swap');
.font-barcode{
    font-family: 'Libre Barcode EAN13 Text', cursive;
}
@page{size:A4}

.item-card{
    @apply rounded-sm shadow relative overflow-hidden;
    @apply w-[calc((100%-3rem)/4)]  p-2;
    >.title{

    }
    >.code{

    }
    >.removeme{
        @apply h-6 w-6 ;
        >div{
            @apply text-center;
            @apply h-full w-full;
            @apply transition;
            @apply cursor-pointer;
            @apply transform translate-x-4 p-1 -translate-y-4 opacity-0 bg-red-400 text-white rounded-bl-lg;
        }
    }
    >.removeme:hover{
        >div{
            @apply transition;
            @apply transform translate-x-0 translate-y-0 opacity-100;
        }
    }

    &.-addnew{
        @apply cursor-pointer text-xs;
    }

    &.-addnew.-inactive{
        @apply bg-gray-200 hover:ring hover:opacity-70
    }
    &.-addnew.-active{
    }

    >.editme{
        @apply h-6 w-6 ;
        >div{
            @apply text-center;
            @apply h-full w-full;
            @apply transition;
            @apply cursor-pointer;
            @apply transform -translate-x-4 p-1 -translate-y-4 opacity-0 bg-green-400 text-white rounded-br-lg;
        }
    }
    >.editme:hover{
        >div{
            @apply transition;
            @apply transform translate-x-0 translate-y-0 opacity-100;
        }
    }
}
</style>