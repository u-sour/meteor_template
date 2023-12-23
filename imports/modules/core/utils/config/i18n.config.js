import { createI18n } from "vue-i18n";

//lang assets
import enApp from '/imports/i18n/en-US';
import khApp from '/imports/i18n/km-KH';
import enCore from '/imports/modules/core/i18n/en-US'
import khCore from '/imports/modules/core/i18n/km-KH'

function loadLocaleMessages() {
    const locales = [{ en: { app: enApp, core: enCore } }, { km: { app: khApp, core: khCore } }]
    const messages = {}
    locales.forEach(lang => {
        const key = Object.keys(lang)
        messages[key] = lang[key]
    })
    return messages
}

const locale = localStorage.getItem('locale')

const i18nConfig = createI18n({
    legacy: false,
    locale: locale,
    fallbackLocale: 'en',
    globalInjection: true,
    messages: loadLocaleMessages(),

})

export default i18nConfig;