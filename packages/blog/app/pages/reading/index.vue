<script setup lang="ts">
// Reading app landing page - profile selection
definePageMeta({
  layout: 'reading'
})

// TODO: Load profiles from API
const profiles = ref([
  {
    id: '1',
    name: 'Alex',
    avatar: '🦁'
  },
  {
    id: '2',
    name: 'Sam',
    avatar: '🦊'
  }
])

const showCreateProfile = ref(false)

function selectProfile(_id: string) {
  // TODO: Set current profile and navigate to practice
  navigateTo('/reading/practice')
}

function createProfile() {
  showCreateProfile.value = true
}
</script>

<template>
  <div class="reading-landing">
    <div class="reading-hero">
      <h1 class="reading-title">
        Welcome to KidsReader! 📚
      </h1>
      <p class="reading-subtitle">
        Choose your profile to start practicing
      </p>
    </div>

    <div class="profile-grid">
      <button
        v-for="profile in profiles"
        :key="profile.id"
        class="profile-card"
        @click="selectProfile(profile.id)"
      >
        <div class="profile-avatar">
          {{ profile.avatar }}
        </div>
        <div class="profile-name">
          {{ profile.name }}
        </div>
      </button>

      <button
        class="profile-card profile-card-create"
        @click="createProfile"
      >
        <div class="profile-avatar">
          ➕
        </div>
        <div class="profile-name">
          New Profile
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.reading-landing {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.reading-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.reading-title {
  all: unset;
  display: block;
  font-size: 3rem;
  font-weight: 800;
  color: #8b5cf6;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.reading-subtitle {
  all: unset;
  display: block;
  font-size: 1.5rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.profile-card {
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 180px;
  text-align: center;
}

.profile-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.profile-card:active {
  transform: translateY(-4px) scale(1.01);
}

.profile-card-create {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px dashed #3b82f6;
}

.profile-avatar {
  font-size: 4rem;
  line-height: 1;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.profile-card-create .profile-name {
  color: #3b82f6;
}

/* Tablet optimization */
@media (min-width: 768px) and (max-width: 1024px) {
  .reading-title {
    font-size: 2.5rem;
  }

  .profile-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

/* Mobile */
@media (max-width: 767px) {
  .reading-title {
    font-size: 2rem;
  }

  .reading-subtitle {
    font-size: 1.25rem;
  }

  .profile-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .profile-card {
    padding: 1.5rem;
    min-height: 150px;
  }

  .profile-avatar {
    font-size: 3rem;
  }

  .profile-name {
    font-size: 1.25rem;
  }
}
</style>
