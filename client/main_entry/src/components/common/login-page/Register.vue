<template>
    
    <div>
        <h1 class="title">Регистрация</h1>
        <div class="box" style="min-width:380px;">
            <app-inputs mode="register"></app-inputs>
        </div>
    </div>

</template>

<script>
    import Inputs from './common/Inputs';
    
    export default {
        components: {
            'app-inputs': Inputs,
        },
    }
</script>