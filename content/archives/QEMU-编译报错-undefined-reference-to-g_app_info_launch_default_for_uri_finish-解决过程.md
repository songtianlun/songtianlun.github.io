---
title: "QEMU 编译报错 undefined reference to g_app_info_launch_default_for_uri_finish 解决过程"
categories: [ "技术" ]
tags: [ "KVM","QEMU" ]
draft: false
slug: "560"
date: "2021-08-20 11:56:31"
---

编译 QEMU 时报如下错误：

```powershell
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_app_info_launch_default_for_uri_finish'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_type_check_instance_is_fundamentally_a'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_app_info_launch_default_for_uri_async'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_strv_contains'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_list_model_get_type'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_drive_is_removable'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_application_get_resource_base_path'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_log_structured_standard'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_type_get_instance_count'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_list_model_get_n_items'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_file_enumerator_iterate'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_param_spec_get_name_quark'
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/../../../../lib64/libgtk-3.so: undefined reference to `g_list_model_get_item'
collect2: error: ld returned 1 exit status
make[1]: *** [qemu-system-x86_64] Error 1
make: *** [subdir-x86_64-softmmu] Error 2
```

先看一下报错的动态链接库依赖了哪些库：

```powershell
$ ldd /lib64/libgtk-3.so       
        linux-vdso.so.1 =>  (0x00007ffc89762000)
        libgdk-3.so.0 => /lib64/libgdk-3.so.0 (0x00007f19938ab000)
        libgmodule-2.0.so.0 => /lib64/libgmodule-2.0.so.0 (0x00007f19936a7000)
        libpangocairo-1.0.so.0 => /lib64/libpangocairo-1.0.so.0 (0x00007f1993499000)
        libX11.so.6 => /lib64/libX11.so.6 (0x00007f199315b000)
        libXi.so.6 => /lib64/libXi.so.6 (0x00007f1992f4b000)
        libXfixes.so.3 => /lib64/libXfixes.so.3 (0x00007f1992d45000)
        libcairo-gobject.so.2 => /lib64/libcairo-gobject.so.2 (0x00007f1992b3c000)
        libcairo.so.2 => /lib64/libcairo.so.2 (0x00007f1992805000)
        libgdk_pixbuf-2.0.so.0 => /lib64/libgdk_pixbuf-2.0.so.0 (0x00007f19925dd000)
        libatk-1.0.so.0 => /lib64/libatk-1.0.so.0 (0x00007f19923b7000)
        libatk-bridge-2.0.so.0 => /lib64/libatk-bridge-2.0.so.0 (0x00007f1992188000)
        libwayland-client.so.0 => /lib64/libwayland-client.so.0 (0x00007f1991f79000)
        libepoxy.so.0 => /lib64/libepoxy.so.0 (0x00007f1991c4d000)
        libpangoft2-1.0.so.0 => /lib64/libpangoft2-1.0.so.0 (0x00007f1991a37000)
        libpango-1.0.so.0 => /lib64/libpango-1.0.so.0 (0x00007f19917f1000)
        libfontconfig.so.1 => /lib64/libfontconfig.so.1 (0x00007f19915af000)
        libgio-2.0.so.0 => /lib64/libgio-2.0.so.0 (0x00007f199120f000)
        libgobject-2.0.so.0 => /lib64/libgobject-2.0.so.0 (0x00007f1990fbe000)
        libglib-2.0.so.0 => /lib64/libglib-2.0.so.0 (0x00007f1990ca8000)
        libm.so.6 => /lib64/libm.so.6 (0x00007f19909a6000)
        libpthread.so.0 => /lib64/libpthread.so.0 (0x00007f199078a000)
        libc.so.6 => /lib64/libc.so.6 (0x00007f19903bc000)
        libXinerama.so.1 => /lib64/libXinerama.so.1 (0x00007f19901b9000)
        libXrandr.so.2 => /lib64/libXrandr.so.2 (0x00007f198ffae000)
        libXcursor.so.1 => /lib64/libXcursor.so.1 (0x00007f198fda3000)
        libXcomposite.so.1 => /lib64/libXcomposite.so.1 (0x00007f198fba0000)
        libXdamage.so.1 => /lib64/libXdamage.so.1 (0x00007f198f99d000)
        libxkbcommon.so.0 => /lib64/libxkbcommon.so.0 (0x00007f198f75d000)
        libwayland-cursor.so.0 => /lib64/libwayland-cursor.so.0 (0x00007f198f555000)
        libwayland-egl.so.1 => /lib64/libwayland-egl.so.1 (0x00007f198f353000)
        libXext.so.6 => /lib64/libXext.so.6 (0x00007f198f141000)
        librt.so.1 => /lib64/librt.so.1 (0x00007f198ef39000)
        libdl.so.2 => /lib64/libdl.so.2 (0x00007f198ed35000)
        libpcre.so.1 => /lib64/libpcre.so.1 (0x00007f198ead3000)
        libfreetype.so.6 => /lib64/libfreetype.so.6 (0x00007f198e814000)
        libxcb.so.1 => /lib64/libxcb.so.1 (0x00007f198e5ec000)
        libpixman-1.so.0 => /lib64/libpixman-1.so.0 (0x00007f198e343000)
        libEGL.so.1 => /lib64/libEGL.so.1 (0x00007f198e12f000)
        libpng15.so.15 => /lib64/libpng15.so.15 (0x00007f198df04000)
        libxcb-shm.so.0 => /lib64/libxcb-shm.so.0 (0x00007f198dd00000)
        libxcb-render.so.0 => /lib64/libxcb-render.so.0 (0x00007f198daf2000)
        libXrender.so.1 => /lib64/libXrender.so.1 (0x00007f198d8e7000)
        libz.so.1 => /lib64/libz.so.1 (0x00007f198d6d1000)
        libGL.so.1 => /lib64/libGL.so.1 (0x00007f198d445000)
        libatspi.so.0 => /lib64/libatspi.so.0 (0x00007f198d214000)
        libdbus-1.so.3 => /lib64/libdbus-1.so.3 (0x00007f198cfc4000)
        libffi.so.6 => /lib64/libffi.so.6 (0x00007f198cdbc000)
        libharfbuzz.so.0 => /lib64/libharfbuzz.so.0 (0x00007f198cb1f000)
        libthai.so.0 => /lib64/libthai.so.0 (0x00007f198c913000)
        libfribidi.so.0 => /lib64/libfribidi.so.0 (0x00007f198c6f7000)
        libexpat.so.1 => /lib64/libexpat.so.1 (0x00007f198c4cd000)
        libuuid.so.1 => /lib64/libuuid.so.1 (0x00007f198c2c8000)
        libselinux.so.1 => /lib64/libselinux.so.1 (0x00007f198c0a1000)
        libresolv.so.2 => /lib64/libresolv.so.2 (0x00007f198be87000)
        libmount.so.1 => /lib64/libmount.so.1 (0x00007f198bc44000)
        libgcc_s.so.1 => /lib64/libgcc_s.so.1 (0x00007f198ba2e000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f199449d000)
        libbz2.so.1 => /lib64/libbz2.so.1 (0x00007f198b81e000)
        libXau.so.6 => /lib64/libXau.so.6 (0x00007f198b61a000)
        libGLdispatch.so.0 => /lib64/libGLdispatch.so.0 (0x00007f198b364000)
        libGLX.so.0 => /lib64/libGLX.so.0 (0x00007f198b132000)
        libsystemd.so.0 => /lib64/libsystemd.so.0 (0x00007f198af01000)
        libgraphite2.so.3 => /lib64/libgraphite2.so.3 (0x00007f198acd3000)
        libblkid.so.1 => /lib64/libblkid.so.1 (0x00007f198aa93000)
        libcap.so.2 => /lib64/libcap.so.2 (0x00007f198a88e000)
        liblzma.so.5 => /lib64/liblzma.so.5 (0x00007f198a668000)
        liblz4.so.1 => /lib64/liblz4.so.1 (0x00007f198a459000)
        libgcrypt.so.11 => /lib64/libgcrypt.so.11 (0x00007f198a1d8000)
        libgpg-error.so.0 => /lib64/libgpg-error.so.0 (0x00007f1989fd3000)
        libdw.so.1 => /lib64/libdw.so.1 (0x00007f1989d82000)
        libattr.so.1 => /lib64/libattr.so.1 (0x00007f1989b7d000)
        libelf.so.1 => /lib64/libelf.so.1 (0x00007f1989965000)
```

观察输出，所有依赖的动态链接库都有指向一个内存地址，说明所依赖的链接库都已经被加载入内存，**排除了链接库不存在情况**，下面就有可能是某个链接库有问题了，接下来做两件事：

- 使用 `objdump -T <lib name and path> ｜grep <funcname>` 命令检索报错函数属于哪一个链接库；
- 使用 `find / -name <lib name>` 命令查找是否有哪一个**报错链接库**在系统的动态链接库搜索目录中有多个；

经过一番检索，发现 `[libgio-2.0.so](http://libgio-2.0.so)` 在系统so检索目录有两个，分别是 `/usr/local/lib/libgio-2.0.so` 和 `/lib64/libgio-2.0.so` ，其中 `/lib64` 为系统默认链接库存放位置，而 `/usr/local` 为编译安装库的默认安装位置，移除`/usr/local/lib/libgio-2.0.so` 之后再次尝试编译发现报错减少了。

此时发现系统曾编译安装了 `glib`  ，可能是那时引入了一些错误的 `so` 库，因此进入编译目录 `make uninstall` 移除此前安装的错误的库，再次尝试编译发现编译通过。

## 总结

本次编译错误排查了很久，最后在大佬的协助下终于解决，此类缺少依赖错误排查错误思路可以总结为 **检查链接库是否存在 -> 检查是否存在重复链接库 -> 移除错误链接库** 。

## 参考文献

- [linux查看动态库/程序依赖的库](https://blog.csdn.net/mayue_web/article/details/104019036)