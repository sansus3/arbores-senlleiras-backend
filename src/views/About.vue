<template>
    <article class="bd-cheatsheet container-fluid bg-body">
        <header>
            <h2 class="fw-bold pt-3 pt-xl-5 pb-2 pb-xl-3">Santiago Sustentable III</h2>
        </header>
        <section class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
            <h3>Obradoiros</h3>
            <a
                class="d-flex align-items-center"
                href="https://santiagosustentable.com/`"
            >Más información</a>
            <p class="lead">Análise, deseño e construcción dunha App no ámbito das árbores e bosques de Compostela en realidade virtual e aumentada</p>
            <div>                
                <storage-firebase :files_uid="'sp-1644766431297'"></storage-firebase>
            </div>
        </section>
    </article>
</template>

<script setup>
    import StorageFirebase from '@/components/specie/StorageFirebase.vue';
</script>