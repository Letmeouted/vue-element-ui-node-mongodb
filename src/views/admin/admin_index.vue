<template lang="html">
  <div class="admin_index">
    <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline},
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
  },
  created() {
   
  },
  methods: {
  }
}
</script>

<style lang="less">
.admin_index{
  h1{
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 22px;
  }
  .admin_index_box{
    display: flex;
    .admin_index_item{
      flex: 1;
      text-align: center;
      img{
        width: 100px;
        height: 100px;
      }
      .text{
        height: 50px;
        line-height: 50px;
        span{
          color: #4fc08d;
        }
      }
    }
  }
  .admin_index_desc{
    margin-top:20px;
    text-align: center;
    .admin_index_desc_box{
      display: flex;
      ul{
        flex: 1;
        li{
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #f5f5f5;
          text-align: left;
          &.title{
            color: #4fc08d;
          }
          i{
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
  }
}

</style>
