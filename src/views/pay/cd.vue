
<template>
  <basic-container>
    <avue-data-pay :option="option"></avue-data-pay>
    <div v-show="dismoney != 0">
      <avue-form :option="dayOption" v-model="form" @submit="handleSubmit">
      </avue-form>
    </div>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      dismoney: 0,
      option: {
        span: 8,
        data: [
          {
            title: "延长试用",
            src: "images/vip1.png",
            dismoney: "5",
            tip: "/天",
            color: "#808695",
            subtext: "购买",
            click: (item) => {
              this.dismoney = item.dismoney * 1;
              this.setDayOption({
                label: "购买天数",
                dicData: [
                  {
                    label: "1天",
                    value: 1,
                  },
                  {
                    label: "5天",
                    value: 5,
                  },
                  {
                    label: "10天",
                    value: 10,
                  },
                  {
                    label: "15天",
                    value: 15,
                  },
                  {
                    label: "20天",
                    value: 20,
                  },
                  {
                    label: "30天",
                    value: 30,
                  },
                ],
              });
            },
            list: [
              {
                title: "功能：测试版功能，模块无限制",
                check: true,
              },
              {
                title: "功能：不限用户数，不限设备数",
                check: true,
              },
              {
                title: "服务：试用期内，提供技术支持",
                check: true,
              },
              {
                title: "服务：提供教程，提供人工服务",
                check: true,
              },
              {
                title: "时长：1-15天，按天计费",
                check: true,
              },
            ],
          },
          {
            title: "云服务版",
            src: "images/vip2.png",
            color: "#ffa820",
            dismoney: "3600",
            tip: "/年",
            subtext: "购买",
            click: (item) => {
              this.dismoney = item.dismoney * 1;
              this.setDayOption({
                label: "购买年限",
                dicData: [
                  {
                    label: "1年",
                    value: 1,
                  },
                  {
                    label: "2年",
                    value: 2,
                  },
                  {
                    label: "3年",
                    value: 3,
                  },
                  {
                    label: "4年",
                    value: 4,
                  },
                  {
                    label: "5年",
                    value: 5,
                  },
                ],
              });
            },
            list: [
              {
                title: "小程序缴费、保修、催缴",
                check: true,
              },
              {
                title: "可视化数据屏、显示实时收费信息",
                check: true,
              },
              {
                title: "供热缴费、减免、报停",
                check: true,
              },
              {
                title: "自定义报修表单，后台添加维护信息",
                check: true,
              },
            ],
          },
          {
            title: "私有化定制",
            src: "images/vip3.png",
            color: "#ef4868",
            money: "",
            dismoney: "48000",
            tip: "/永久",
            subtext: "购买",
            click: (item) => {
              this.dismoney = item.dismoney * 1;
              this.setDayOption({
                label: "购买年限",
                dicData: [
                  {
                    label: "永久",
                    value: 1,
                  },
                ],
              });
            },
            list: [
              {
                title: "按云平台现有功能定制",
                check: true,
              },
              {
                title:
                  "数据本地化PC端+小程序+公众号独立组合开发皮肤/logo/界面自定义定做",
                check: true,
              },
              {
                title:
                  "根据用户行业特点，提供报修解决方案按照用户实际需求，根据需求定制开发签订合同",
                check: true,
              },
              {
                title: "提供解决方案，按年维护",
                check: true,
              },
            ],
          },
        ],
      },
      form: {
        radio: 0,
      },
      dayOption: {
        labelWidth: 100,
        column: [
          {
            label: "购买天数",
            prop: "radio",
            type: "radio",
            span: 24,
            button: true,
            dicData: [
              {
                label: "1天",
                value: 1,
              },
              {
                label: "5天",
                value: 5,
              },
              {
                label: "10天",
                value: 10,
              },
              {
                label: "15天",
                value: 15,
              },
              {
                label: "20天",
                value: 20,
              },
              {
                label: "30天",
                value: 30,
              },
            ],
            change: ({ value }) => {
              this.changeTotalMoney(value);
            },
          },
          {
            label: "计算费用",
            prop: "totalMoney",
            value: 5,
            disabled: true,
          },
        ],
      },
    };
  },
  methods: {
    changeTotalMoney(val) {
      this.$set(this.dayOption.column[1], "value", val * this.dismoney);
      this.form.totalMoney = val * this.dismoney;
    },
    setDayOption(option) {
      this.dayOption.column[0].label = option.label;
      this.dayOption.column[0].dicData = option.dicData;
      this.form.totalMoney = this.dismoney;
    },
    handleSubmit(form) {
      this.$router.push({ path: "/pay/details", query: form });
    },
  },
};
</script>