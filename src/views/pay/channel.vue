<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      :page.sync="page"
      @row-del="rowDel"
      v-model="form"
      ref="crud"
      :permission="permissionList"
      @row-update="rowUpdate"
      @row-save="rowSave"
      :before-open="beforeOpen"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          v-if="permission.client_delete"
          @click="handleDelete"
          >删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/pay/channel";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      option: {
        border: true,
        index: true,
        indexLabel: "序号",
        stripe: true,
        menuAlign: "center",
        align: "center",
        viewBtn: true,
        searchMenuSpan: 6,
        column: [
          {
            label: "主键",
            prop: "id",
            hide: true,
            editDisabled: true,
            addDisplay: false,
          },
          {
            label: "appId",
            prop: "appId",
            rules: [
              {
                required: true,
                message: "请输入应用标识",
                trigger: "blur",
              },
            ],
          },
          {
            label: "支付类型",
            prop: "channelId",
            type: "select",
            dicUrl: "/api/beletech-system/dict/dictionary?code=channel_id",
            search: true,
            props: {
              label: "dictValue",
              value: "dictKey",
            },
            rules: [
              {
                required: true,
                message: "请选择支付类型",
                trigger: "blur",
              },
            ],
          },
          {
            label: "渠道名称",
            prop: "channelName",
            rules: [
              {
                required: true,
                message: "请输入渠道名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "商户号",
            prop: "channelMchId",
            placeholder: "渠道商户号",
            rules: [
              {
                required: true,
                message: "请输入商户编号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "渠道状态",
            prop: "state",
            type: "select",
            dicUrl: "/api/beletech-system/dict/dictionary?code=channel_status",
            search: true,
          },
          {
            label: "前端回调地址",
            prop: "returnUrl",
          },
          {
            label: "后端回调域名",
            prop: "notifyUrl",
          },
          {
            label: "备注",
            prop: "remark",
          },
          {
            label: "配置参数",
            prop: "param",
            type: "textarea",
            placeholder: "扩展参数,json字符串",
            minRows: 4,
            row: true,
            span: 24,
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入支付参数",
                trigger: "blur",
              },
            ],
          },
          {
            width: 150,
            label: "创建时间",
            prop: "createTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            editDisplay: false,
            addDisplay: false,
          },
        ],
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        // addBtn: this.vaildData(this.permissions.pay_paychannel_add, false),
        // delBtn: this.vaildData(this.permissions.pay_paychannel_del, false),
        // editBtn: this.vaildData(this.permissions.pay_paychannel_edit, false)
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    rowSave(row, done, loading) {
      add(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.$refs.crud.toggleSelection();
        });
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then((res) => {
          this.form = res.data.data;
        });
      }
      done();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style></style>
