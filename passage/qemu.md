# 如何在m1 Mac上使用qemu  
#### 附：utm在m1 Mac上的使用教程  

> 注意！
> 本文章发布过于久远
> 不具有时效性
> 请仔细甄别
> 你已经被警告
> 请勿直接使用本文所给出的方法
> 导致问题概不负责

## 第一部分：qemu教程  
参考<a target="_blank" href="https://forums.macrumors.com/threads/success-virtualize-windows-10-for-arm-on-m1-with-alexander-grafs-qemu-hypervisor-patch.2272354/">文献</a>  
  
bilibili搬运视频（评论区有up主的详细教程）（笔者非搬运视频的up主）：<a target="_blank" href="https://b23.tv/JOZ2Ib">link</a>  
  
### 基础
1. 首先<a target="_blank" href="https://mega.nz/file/QYB0QTrC#p6IMBJlFqqNKuGonwrDkPOVKQj8yHCVgiLOYVaGvs4M">下载qemu-m1</a>（该归档中包含了随后所需要的efi引导文件[efi-virtio.rom和QEMU_EFI.fd]以及qemu-system-aarch64，即ARM64）  
2. 在Windows预览版计划中下载Windows ARM版<a target="_blank" href="https://www.microsoft.com/zh-cn/software-download/windowsinsiderpreviewARM64">下载链接</a>(同样，您也可以从网上下载旧版本的Windows ARMARM 如：win arm21277中文版)
3. 进入解压后qemu-m1目录，替换对应文字，并输入以下命令（一次性输入完并按下return）  

```bash
DYLD_LIBRARY_PATH=. \
./qemu-system-aarch64 \
-M virt \
-accel hvf \
-m 5G \
-smp 4 \
-cpu max \
-device ramfb \
-serial stdio \
-drive file=【您的WindowsARM vhdx文件路径】,if=none,id=NVME1 \
-device nvme,drive=NVME1,serial=nvme-1 \
-device nec-usb-xhci \
-device usb-kbd \
-device usb-tablet \
-device intel-hda -device hda-duplex \
-drive file=vars-template-pflash.raw,if=pflash,index=1 \
-bios QEMU_EFI.fd
```  

#### 踩坑：
1. 第一次运行会出现黑屏，关闭qemu窗口后重新运行一次即可  
2. 如果在启动时出现 Windows无法启动等类似提示语，点击重新启动（或shutdown），接下来等待窗口变暗并手动关闭qemu窗口  
3. 为防止镜像损坏，您应该先关机Windows，然后手动关闭qemu窗口  
  
### 调整分辨率：
1. 在qemu显示`Start boot option`时按下<kbd>ESC</kbd>键  
2. 通过方向键选择`Device Manager`并按下<kbd>return</kbd>
3. 继续按照上部操作选择`OVMF Platform Configuration`并按下<kbd>return</kbd>
4. 在`Change Preferred`旁的突出选择中选择需要的分辨率，并按下<kbd>F10</kbd>或<kbd>F10</kbd>+<kbd>FN</kbd>以保存更改  
5. 接下来按下<kbd>ESC</kbd>，直至返回初始页面
6. 选择`Continue`并按下<kbd>return</kbd>，等到启动windows后关闭Windows，接下来重新启动windows即可完成更改（有时不需要重新启动也可看到更改）

### 连接网络：
1. <a target="_blank" href="https://fedorapeople.org/groups/vir...o/virtio-win-0.1.190-1/virtio-win-0.1.190.iso">下载</a>virtio驱动ISO文件,将其放在qemu-m1目录下  
2. 启动Windows，并以管理员模式打开cmd或powershell，输入以下命令：

```bush
bcdedit -set TESTSIGNING ON
```  

3. 关闭Windows，并更新您的启动命令为：  

```bush
DYLD_LIBRARY_PATH=. \
./qemu-system-aarch64 \
-M virt \
-accel hvf \
-m 5G \
-smp 4 \
-cpu max \
-device ramfb \
-serial stdio \
-drive file=【您的WindowsARM vhdx文件路径】,if=none,id=NVME1 \
-device nvme,drive=NVME1,serial=nvme-1 \
-device nec-usb-xhci \
-device usb-kbd \
-device usb-tablet \
-device intel-hda -device hda-duplex \
-drive file=vars-template-pflash.raw,if=pflash,index=1 \
-drive file=virtio-win-0.1.190.iso,media=cdrom,if=none,id=cdrom -device usb-storage,drive=cdrom \
-net nic,model=virtio \
-net user \
-bios QEMU_EFI.fd
```  


4. 在Windows启动后，选择`设备管理器`或`Device Manager`  
5. 在`其它设备`或`Other devices`列表中，选择最后一项的`Unknow device`  
6. 接下来依次点击：`更新驱动 > 从我的设备中选择 > 浏览`或`Update drivers > Browse my computer for drivers > Browse`  
7. 选择磁盘`D:virtio-win`即可  
8. 接下来选择`是 > 下一步 > 允许`或`OK > Next > Allow`  
接下来您应该有网络连接了  
  
#### 踩坑
1. 设备管理器无法启动：您的WindowsARM镜像版本过低  
2. 无法安装驱动：多重新启动几次Windows，每一次启动更新一次驱动，直至成功  
  
### 至此，使用qemu启动Windows的教程为止，但是qemu的功能远不止如此，您还可以使用spice代理以实现更多功能，笔者能力有限，就不在此过多赘述
  
  
## 第二部分：utm的使用教程  
#### 提前声明：本教程只适用于m1芯片的mac  
参考：https://mac.getutm.app/gallery/windows-10-arm  
由于笔者在写此文章时电脑不在身边，因此部分词汇也许会与原本词语有所差异，请见谅
  
1. 首先下载如下文件：
- utm for mac( https://mac.getutm.app )  
- Windows ARM（前面有链接）  
- <a target="_blank" href="https://github.com/utmapp/qemu/releases/download/v5.2.0-asi/spice-guest-tools-0.164.iso">spice代理工具</a>  
  
2. 打开utm，创建一个新的虚拟机，可以自行更改虚拟机信息  
  
3. 点击系统一栏，选择架构为aarch64，系统为qemu 6.1 ARM Virtual Machine(virt-6.1)，并分配给虚拟机至少4G(4096MB)内存  
  
4. 进入驱动器一栏，点击`导入驱动器`，并选择您的Windows镜像  
  
5. 设置刚才的驱动器，将格式设置为磁盘镜像，接口设置为NVMee  
  
6. 接下来点击`新建驱动器`，并打开`可扩展`选项，设置接口选项为USB  
  
7. 保存虚拟机，在边栏中选择它，在右下角单击`浏览`，并选择刚才下载的`spice代理工具的ISO文件`  
  
8. 接下来正常安装Windows即可  
  
> 键鼠问题：  
> 按工具栏中的鼠标按钮以捕获鼠标。同时按下按 <kbd>Control</kbd>+<kbd>Option</kbd> 键退出鼠标捕获模式  
  
9. 完成安装并登陆后，打开Windows资源管理器并进入`D:\`，运行spice安装程序，该程序应安装所有驱动程序以及QEMU代理、SPICE代理（用于复制/粘贴和动态分辨率）和共享目录。
请注意，由于libslirp的限制，ping将不起作用，因此Windows可能会认为仍然没有互联网连接。（复制自原文章）  
  
### 动态分辨率
  
10. 安装SPICE代理工具后，前往桌面，右键单击任意位置，然后选择`显示设置`。  
  
11. 向下滚动到`多显示器`，然后选择`仅在1上显示`。鼠标可能会卡在第二个显示器上，应此您可能需要使用键盘重新启动。  
  
### 共享目录
  
12. 将Windows关机后，打开设置并转到`共享`选项卡，选中`启用目录共享`。
  
13. 在`共享目录`下单击`浏览`并选择要与虚拟机共享的目录。
  
14. Windows启动后，在安装了SPICE代理工具的前提下，共享目录应显示为网络驱动器。