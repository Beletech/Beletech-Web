
<template>
  <basic-container>
    <avue-data-pay :option="option"></avue-data-pay>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      option: {
        span: 8,
        data: [
          {
            title: "延长试用",
            src: "images/vip1.png",
            // money: "5",
            dismoney: "5",
            tip: "/天",
            color: "#808695",
            subtext: "购买",
            click: function (item) {
              alert(JSON.stringify(item));
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
            money: "",
            dismoney: "3600",
            tip: "/年",
            subtext: "购买",
            click: function (item) {
              alert(JSON.stringify(item));
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
            click: function (item) {
              alert(JSON.stringify(item));
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
      }
    };
  },
};
</script>