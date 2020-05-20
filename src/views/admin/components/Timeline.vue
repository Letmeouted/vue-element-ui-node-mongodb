<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top" >
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2020/1/10',
          title: 'Update Github template',
          content: 'wang-boss committed 2020/1/10 20:46',
        },
        {
          timestamp: '2020/1/11',
          title: 'Update Github template',
          content: 'wang-boss committed 2020/1/11 20:46'
        },
        {
          timestamp: '2020/1/12',
          title: 'Build Template',
          content: 'wang-boss committed 2020/1/12 20:46'
        },
        {
          timestamp: '2020/1/13',
          title: 'Release New Version',
          content: 'wang-boss committed 2020/1/13 20:46'
        }
      ]
    }
  }
}
</script>
