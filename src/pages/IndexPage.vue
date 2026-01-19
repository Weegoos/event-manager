<script lang="ts" setup>
import { initEvents } from 'src/boot/initEvents';
import { onMounted } from 'vue';

onMounted(() => {
  initEvents();
});
</script>
