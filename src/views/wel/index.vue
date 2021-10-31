<template>
  <div>
    <el-row>
      <el-col :span="24">
        <third-register></third-register>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <basic-container>
          <p style="text-align: center">
            <img src="https://img.shields.io/badge/Release-V2.8.2-green.svg" alt="Downloads"/>
            <img src="https://img.shields.io/badge/JDK-1.8+-green.svg" alt="Build Status"/>
            <img src="https://img.shields.io/badge/Spring%20Cloud-Hoxton.SR11-blue.svg" alt="Coverage Status"/>
            <img src="https://img.shields.io/badge/Spring%20Boot-2.3.12.RELEASE-blue.svg" alt="Downloads"/>
          </p>
        </basic-container>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <basic-container>
        </basic-container>
      </el-col>
      <el-col :span="8">
        <el-row>
          <basic-container>
          </basic-container>
        </el-row>
        <el-row>
          <basic-container>
          </basic-container>
        </el-row>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "wel",
    data() {
      return {
        activeNames: ['1', '2', '3', '5'],
        logActiveNames: ['24']
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    methods: {
      handleChange(val) {
        window.console.log(val);
      }
    },
  };
</script>

<style>
  .el-font-size {
    font-size: 14px;
  }
</style>

