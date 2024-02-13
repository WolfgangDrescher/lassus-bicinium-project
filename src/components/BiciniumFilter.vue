<script setup>
import filterOptions from '../utils/bicinium-filter-options.json';

const emit = defineEmits(['updateFilter']);

const biciniumFilter = useBiciniumFilterOptions();

watch(biciniumFilter, () => {
    emit('updateFilter');
});

function resetFilter() {
    biciniumFilter.reset();
}

const { searchText, mode, finalis, transposition } = storeToRefs(biciniumFilter);

const modeOptions = [
    { id: 'dorian', label: 'Dorisch' },
    { id: 'phrygian', label: 'Phrygisch' },
    { id: 'lydian', label: 'Lydisch' },
    { id: 'mixolydian', label: 'Mixolydisch' },
    { id: 'aeolian', label: 'Æolisch' },
    { id: 'ionian', label: 'Ionisch' },
    { id: 'locrian', label: 'Lokrisch' },
].filter(({id}) => filterOptions.modes.includes(id));

const finalisOptions = filterOptions.finalis;
</script>

<template>
    <UCard>
        <template #header>
            <div class="font-medium leading-5">
                Filter
            </div>
        </template>
        <div class="flex gap-2 mb-3">
            <UFormGroup label="Suchtext" class="lg:w-48">
                <UInput v-model="searchText" />
            </UFormGroup>
            <UFormGroup label="Modus" class="lg:w-48">
                <USelectMenu
                    v-model="mode"
                    multiple
                    class="w-full"
                    value-attribute="id"
                    :options="modeOptions"
                />
            </UFormGroup>
            <UFormGroup label="Finalis" class="lg:w-48">
                <USelectMenu
                    v-model="finalis"
                    multiple
                    class="w-full"
                    :options="finalisOptions"
                />
            </UFormGroup>
            <UFormGroup label="Transposition" class="lg:w-48">
                <USelectMenu
                    v-model="transposition"
                    class="w-full"
                    value-attribute="id"
                    :options="[
                        { id: null, label: '—' },
                        { id: 'cantus_durus', label: 'Cantus durus' },
                        { id: 'cantus_mollis', label: 'Cantus mollis' },
                    ]"
                />
            </UFormGroup>
        </div>
        <UButton color="red" variant="outline" @click="resetFilter">Zurücksetzen</UButton>
    </UCard>
</template>
