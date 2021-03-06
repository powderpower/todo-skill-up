import Vue from 'vue';

import events from '@config/events';

export const eventBus = new Vue({
    methods: {
        showSuccess: function (heading = 'Выполнено', message = '') {
            this.$emit(events.ON_SUCCESS, heading, message);
        },
        showError: function (heading = 'Ошибка', message = '', details = []) {
            this.$emit(events.ON_ERROR, heading,  message, details);
        },
        hideInviteIntro: function() {
            this.$emit(events.HIDE_INTRO);
        },
        showCardManageModal: function (formData, action) {
            this.$emit(events.SHOW_CARD_MANAGE_MODAL, formData, action);
        },
    },
});