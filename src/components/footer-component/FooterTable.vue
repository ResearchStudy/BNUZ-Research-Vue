<template>

    <div :class="position" >
      <table>
        <tr>
          <th>{{title}}</th>
        </tr>
        <tr   v-for="child in children" :key="child">
          <td><a href="">{{child}}</a></td>
        </tr>
      </table>
    </div>



</template>

<script>
    export default {
        name: "FooterTable",
        props:{
            title: String,
            children: Array,
            position: String
        }
    }
</script>

<style scoped>
.left table tr{
  text-align: left;
}
.right table tr{
  text-align: right;
}
.left table tr th{
  font-size: 20px;
}
.right table tr th{
  font-size: 25px;
  color: #999999;
}
td a{
  font-size: 16px;
  color: #666666;
  text-decoration: none;
}
</style>
