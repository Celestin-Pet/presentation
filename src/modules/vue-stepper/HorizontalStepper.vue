<template>
  <div class="stepper-box">
    <div class="top">
      <div
        class="divider-line"
        :style="{ width: `${(100 / steps.length) * (steps.length - 1) - 10}%` }"
      ></div>
      <div class="steps-wrapper">
        <template v-if="topButtons">
          <div
            v-if="currentStep.index > 0"
            class="stepper-button-top previous"
            @click="backStep()"
          >
            <i class="material-icons">keyboard_arrow_left</i>
          </div>
        </template>
        <template v-for="(step, index) in steps" :key="index">
          <div
            :class="['step', isStepActive(index, step)]"
            :style="{ width: `${100 / steps.length}%` }"
          >
            <div
              class="circle cursor-pointer"
              @click="activateStep(index)"
              title="Cliquez pour aller içi"
            >
              <i class="material-icons md-18">{{
                step.completed ? "done" : step.icon
              }}</i>
            </div>
            <div class="step-title">
              <h4 style="color:#000; font-weight: bold; padding:23px;">{{ step.title }}</h4>
              <h5 class="step-subtitle">{{ step.subtitle }}</h5>
            </div>
          </div>
        </template>
        <div
          v-if="topButtons"
          :class="[
            'stepper-button-top next',
            !canContinue ? 'deactivated' : '',
          ]"
          @click="nextStep()"
        >
          <i class="material-icons">keyboard_arrow_right</i>
        </div>
      </div>
    </div>
    <div class="content p-2 m-0">
      <!-- <transition
        :enter-active-class="enterAnimation"
        :leave-active-class="leaveAnimation"
        mode="out-in"
      > -->
      <!-- <Transition enter-active-class="animate__animated animate__backOutLeft"
          leave-active-class="animate__animated animate__backOutLeft"> -->
        <!--If keep alive-->
        <keep-alive v-if="keepAliveData">
          <component
            :is="steps[currentStep.index].component"
            :clicked-next="nextButton[currentStep.name]"
            :current-step="currentStep"
            :stepper-id="stepperId"
            :current-index="currentStep.index"
            :activate-step="activateStep"
            :ref="`step-${currentStep.index}`"
            @can-continue="canContinue = $event"
            @change-next="changeNextBtnValue"
            @step-submitted="$emit('step-submitted', $event)"
          ></component>
        </keep-alive>
        <!--If not show component and destroy it in each step change-->
        <component
          v-else
          :is="steps[currentStep.index].component"
          :clicked-next="nextButton[currentStep.name]"
          :current-step="currentStep"
          :stepper-id="stepperId"
          :current-index="currentStep.index"
          :activate-step="activateStep"
          :ref="`step-${currentStep.index}`"
          @can-continue="canContinue = $event"
          @change-next="changeNextBtnValue"
          @step-submitted="$emit('step-submitted', $event)"
        ></component>
      <!-- </transition> -->
    </div>
    <div
      v-if="bottomButtons"
      :class="['bottom p-2', currentStep.index > 0 ? '' : 'only-next']"
    >
      <div
        v-if="currentStep.index > 0"
        class="stepper-button previous"
        @click="backStep()"
      >
        <i class="material-icons">keyboard_arrow_left</i>
        <span>{{ translate("back") }}</span>
      </div>
      <div
        :class="['stepper-button next', !canContinue ? 'deactivated' : '']"
        @click="nextStep()"
      >
        <span>{{ finalStep ? translate("finish") : translate("next") }}</span>
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
    </div>
  </div>
</template>

<script>
import translations from "./Translations.js";
import { getUniqueID } from "@/utils/str-utils";
import 'animate.css';
export default {
  emits: [
    "canContinue",
    "changeNext",
    "active-step",
    "completed-step",
    "stepper-finished",
    "clicking-back",
    "before-next-step",
    "step-submitted",
    "reset",
  ],
  props: {
    locale: {
      type: String,
      default: "fr",
    },
    topButtons: {
      type: Boolean,
      default: false,
    },
    bottomButtons: {
      type: Boolean,
      default: true,
    },
    steps: {
      type: Array,
      default: function () {
        return [
          {
            icon: "mail",
            name: "first",
            title: "Sample title 1",
            subtitle: "Subtitle sample",
          },
          {
            icon: "report_problem",
            name: "second",
            title: "Sample title 2",
            subtitle: "Subtitle sample",
          },
        ];
      },
    },
    keepAlive: {
      type: Boolean,
      default: true,
    },
    reset: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentStep: {},
      previousStep: {},
      nextButton: {},
      canContinue: true,
      finalStep: false,
      keepAliveData: this.keepAlive,
      stepperId: `stepper-${getUniqueID()}`,
    };
  },

  computed: {
    enterAnimation() {
      if (this.currentStep.index < this.previousStep.index) {
        return "animated quick fadeInLeft";
      } else {
        return "animated quick fadeInRight";
      }
    },
    leaveAnimation() {
      if (this.currentStep.index > this.previousStep.index) {
        return "animated quick fadeOutLeft";
      } else {
        return "animated quick fadeOutRight";
      }
    },
  },

  methods: {
    translate(value, locale) {
      return translations[locale || this.$props.locale][value];
    },
    isStepActive(index) {
      if (this.currentStep.index === index) {
        return "activated";
      } else {
        return "deactivated";
      }
    },

    activateStep(index, back = false) {
      if (this.steps[index]) {
        this.previousStep = this.currentStep;
        this.currentStep = {
          name: this.steps[index].name,
          index: index,
        };

        if (index + 1 === this.steps.length) {
          this.finalStep = true;
        } else {
          this.finalStep = false;
        }

        if (!back) {
          this.$emit("completed-step", this.previousStep);
        }
      }
      this.$emit("active-step", this.currentStep);
    },

    async nextStepAction() {
      this.nextButton[this.currentStep.name] = true;
      if (this.canContinue) {
        if (this.finalStep) {
          this.$emit("stepper-finished", this.currentStep);
        }

        const currentIndex = this.currentStep.index;

        this.emitter.emit(`stepper-${this.stepperId}-next-${currentIndex}`, {
          currentStep: this.currentStep,
        });

        if (
          this.$refs[`step-${currentIndex}`] &&
          typeof this.$refs[`step-${currentIndex}`].validate === "function"
        ) {
          const result = await this.$refs[`step-${currentIndex}`].validate();
          // console.log("result", result);
          if (
            (typeof result === "boolean" && result === true) ||
            result.value
          ) {
            this.activateStep(currentIndex + 1);
          }
        } else {
          this.activateStep(currentIndex + 1);
        }
      }
      this.canContinue = false;
      this.$forceUpdate();
    },

    nextStep() {
      if (!this.canContinue) {
        return;
      }
      // if (!this.$listeners || !this.$listeners["before-next-step"]) {
        this.nextStepAction();
      // }

      this.canContinue = false;

      this.$emit(
        "before-next-step",
        { currentStep: this.currentStep },
        (next = true) => {
          this.canContinue = true;
          if (next) {
            this.nextStepAction();
          }
        }
      );
    },
    backStep() {
      this.$emit("clicking-back");
      const currentIndex = this.currentStep.index;

      this.emitter.emit(`stepper-${this.stepperId}-back-${currentIndex}`, {
        currentStep: this.currentStep,
      });

      if (currentIndex >= 0) {
        this.activateStep(currentIndex - 1, true);
      }
      this.canContinue = true;
    },

    changeNextBtnValue(payload) {
      this.nextButton[this.currentStep.name] = payload.nextBtnValue;
      this.$forceUpdate();
    },

    init() {
      // Initiate stepper
      this.activateStep(0);
      this.steps.forEach((step) => {
        this.nextButton[step.name] = false;
      });
    },
  },

  watch: {
    reset(val) {
      if (!val) {
        return;
      }

      this.keepAliveData = false;

      this.init();
      this.previousStep = {};

      this.$nextTick(() => {
        this.keepAliveData = this.keepAlive;
        this.$emit("reset", true);
      });
    },
  },

  created() {
    this.init();
  },
};
</script>

<style src="./HorizontalStepper.scss" scoped lang="scss">
</style>
<style scoped>
/* fallback */
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: local("Material Icons"), local("MaterialIcons-Regular"),
    url("./material-icons.woff2") format("woff2");
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 15px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>
