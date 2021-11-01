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
      <template slot="amount" slot-scope="scope">
        <el-tag>{{ scope.row.amount / 100 }}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, getDetail,add, update, remove } from "@/api/pay/order";
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
        searchMenuSpan: 6,
        column: [
          {
            label: "订单号",
            prop: "orderId",
            overHidden: true,
            width: 150,
          },
          {
            label: "渠道ID",
            prop: "channelId",
            width: 120,
          },
          {
            label: "渠道商户",
            prop: "channelMchId",
            width: 120,
          },
          {
            label: "渠道订单",
            prop: "channelOrderNo",
            width: 150,
          },
          {
            label: "商品描述",
            prop: "body",
            overHidden: true,
          },
          {
            label: "金额/元",
            prop: "amount",
            slot: true,
          },
          {
            label: "币种",
            prop: "currency",
          },
          {
            label: "支付状态",
            prop: "status",
            type: "select",
            search: true,
            dicUrl: "/api/beletech-system/dict/dictionary?code=order_status",
          },
          {
            label: "客户端IP",
            prop: "clientIp",
            width: 120,
          },
          {
            label: "成功时间",
            prop: "paySuccTime",
            width: 150,
          },
          {
            label: "创建时间",
            width: 150,
            prop: "createTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            editDisplay: false,
            overHidden: true,
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
        // addBtn: this.vaildData(
        //   this.permissions.generator_paytradeorder_add,
        //   false
        // ),
        // delBtn: this.vaildData(
        //   this.permissions.generator_paytradeorder_del,
        //   false
        // ),
        // editBtn: this.vaildData(
        //   this.permissions.generator_paytradeorder_edit,
        //   false
        // ),
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
