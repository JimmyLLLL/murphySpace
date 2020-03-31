<template>
    <div>
        <span>点击或者拖拽以上传新头像</span>
        <el-upload
            :drag="true"
            class="avatar-uploader"
            action="http://www.jinmylam.xin:8003/blog/uploadAvator"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>          
    </div>
  
</template>


<script>
  export default {
    name:'uploadAva',
    data() {
      return {
        imageUrl: '',
        headers:{
            authorization:localStorage.getItem('token')
        }
      };
    },
    methods: {
        handleError(e){
            this.$message.error('上传出现问题：'+e)
        },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$store.dispatch('changeAvator',{avator:this.imageUrl})
        this.$message.success('头像已更新')
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>


<style lang="scss" scoped>
    /deep/ {
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 157px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 157px;
            height: 178px;
            display: block;
        }        
    }

</style>