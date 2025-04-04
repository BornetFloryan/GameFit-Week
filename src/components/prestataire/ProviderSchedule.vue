<template>
  <div>
    <div v-if="isProvider">
      <label>
        <input type="radio" v-model="serviceStatus" :value="true" @change="toggleServiceStatus"> {{ $t('providerSchedule.activateService') }}
      </label>
      <label>
        <input type="radio" v-model="serviceStatus" :value="false" @change="toggleServiceStatus"> {{ $t('providerSchedule.deactivateService') }}
      </label>
    </div>
    <div v-if="serviceStatus">
      <h1>{{ $t('providerSchedule.scheduleTitle') }}</h1>
      <div class="calendar">
        <div class="calendar-header">
          <div class="calendar-cell"></div>
          <div class="calendar-cell" v-for="day in days" :key="day">{{ day }}</div>
        </div>
        <div class="calendar-body">
          <div class="calendar-row" v-for="hour in hours" :key="hour">
            <div class="calendar-cell">{{ hour }}</div>
            <div class="calendar-cell" v-for="day in days" :key="day">
              <div v-for="event in getEventsForDayAndHour(day, hour)" :key="event.id" class="event" @mouseover="showTooltip" @mouseout="hideTooltip" @click="navigateToService()">
                <p v-html="event.description"></p>
                <p>{{ serviceName(event.service) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ $t('providerSchedule.scheduleDisabled') }}</p>
    </div>
    <div v-if="tooltipVisible" :style="tooltipStyle" class="tooltip">{{ $t('providerSchedule.tooltip') }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: 'ProviderSchedule',
  data() {
    return {
      provider: '',
      standsReservations: [],
      schedule: [],
      days: ['2025-07-07', '2025-07-08', '2025-07-09', '2025-07-10', '2025-07-11', '2025-07-12'],
      hours: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      tooltipVisible: false,
      tooltipStyle: {
        position: 'absolute',
        top: '0px',
        left: '0px'
      },
      serviceStatus: true,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('prestation', ['providerScheduleStatus']),
    ...mapGetters('stands', ['getStandsReservationsByCustomerId']),
    ...mapGetters('prestation', ['getServiceCategoryById', 'getProviderScheduleStatusByCustomerId']),
    ...mapGetters('account', ['getCustomerById']),

    serviceName() {
      return (service) => {
        if (service) {
          return this.getServiceCategoryById(service).name;
        }
        return '';
      };
    },
    isProvider() {
      return this.currentUser && this.currentUser.privilege === '1';
    }
  },
  methods: {
    ...mapActions('stands', ['getStandsReservations']),
    ...mapActions('prestation', ['getProviderScheduleStatus', 'getServiceCategories', 'modifyProviderScheduleStatus']),

    initializeSchedule() {
      const scheduleMap = {};

      this.standsReservations.forEach(reservation => {
        const date = reservation.date.split('T')[0];
        if (!scheduleMap[date]) {
          scheduleMap[date] = {date, events: []};
        }
        scheduleMap[date].events.push({
          id: reservation._id,
          start_time: reservation.start_time,
          end_time: reservation.end_time,
          description: reservation.description,
          service: reservation.service_id
        });
      });

      this.schedule = Object.values(scheduleMap);
    },
    getEventsForDayAndHour(day, hour) {
      const daySchedule = this.schedule.find(d => d.date === day);
      if (!daySchedule) return [];
      return daySchedule.events.filter(event => this.isEventInHour(event, hour));
    },
    isEventInHour(event, hour) {
      const eventStart = new Date(`1970-01-01T${event.start_time}`);
      const eventEnd = new Date(`1970-01-01T${event.end_time}`);
      const currentHour = new Date(`1970-01-01T${hour}:00`);
      return currentHour >= eventStart && currentHour < eventEnd;
    },
    showTooltip(event) {
      this.tooltipVisible = true;
      this.tooltipStyle.top = `${event.clientY + 10}px`;
      this.tooltipStyle.left = `${event.clientX + 10}px`;
    },
    hideTooltip() {
      this.tooltipVisible = false;
    },
    navigateToService() {
      this.$router.push({name: 'dedication-home', query: {prestataireId: this.provider._id}});
    },
    async toggleServiceStatus() {
      try {
        const providerScheduleStatus = await this.getProviderScheduleStatusByCustomerId(this.currentUser._id);
        if (!providerScheduleStatus) {
          alert(this.$t('providerSchedule.statusNotFound'));
          return;
        }
        providerScheduleStatus.schedule_activated = this.serviceStatus;
        await this.modifyProviderScheduleStatus(providerScheduleStatus);
        alert(this.$t(this.serviceStatus ? 'providerSchedule.serviceActivated' : 'providerSchedule.serviceDeactivated'));
      } catch (e) {
        alert(this.$t('providerSchedule.updateError'));
      }
    }
  },
  async mounted() {
    this.provider = this.getCustomerById(this.$route.params.id) || this.currentUser;
    if (this.provider) {
      await this.getStandsReservations();
      await this.getServiceCategories();
      this.standsReservations = await this.getStandsReservationsByCustomerId(this.provider._id) || [];
      if (this.provider) {
        await this.getProviderScheduleStatus()
        const providerScheduleStatus = await this.getProviderScheduleStatusByCustomerId(this.provider._id);
        if (providerScheduleStatus) {
          this.serviceStatus = providerScheduleStatus.schedule_activated;
        }
      }
    }

    this.initializeSchedule();
  },
};
</script>

<style scoped>
.calendar {
  display: grid;
  grid-template-columns: 1fr repeat(6, minmax(120px, 1fr));
  gap: 2px;
  background-color: #f1f3f4;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: contents;
}

.calendar-body {
  display: contents;
}

.calendar-row {
  display: contents;
}

.calendar-cell {
  background-color: #ffffff;
  padding: 12px;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;
}

.calendar-cell:hover {
  background-color: #e3f2fd;
  transform: scale(1.03);
}

.calendar-cell:first-child {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #555555;
}

.event {
  background-color: #1976d2;
  color: #ffffff;
  padding: 8px;
  margin: 5px 0;
  border-radius: 6px;
  position: relative;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s, transform 0.2s;
}

.event:hover {
  background-color: #1565c0;
  transform: scale(1.05);
}

.tooltip {
  background-color: rgba(51, 51, 51, 0.9);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  font-size: 12px;
  font-weight: 400;
}

.tooltip::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px;
  border-color: transparent transparent rgba(51, 51, 51, 0.9) transparent;
  top: -12px;
  left: 10px;
}
</style>