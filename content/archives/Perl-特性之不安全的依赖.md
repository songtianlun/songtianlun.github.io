---
title: "Perl 特性之不安全的依赖"
categories: [ "技术" ]
tags: [ "Perl" ]
draft: false
slug: "630"
date: "2022-07-27 14:56:22"
---

最近写 Perl 程序时遇到一个很奇怪的问题：

```
Insecure dependency in unlink while running with -T switch at ../tmpfile.pl line 44.
```

经过检查，发现这是 Perl 语言一个特性，在运行时使用 `-w` 或 `-T` 都意味着 "万无一失" 标志。

`-T` 标志意味着任何来自外部世界的值（例如从文件读取）都被认为是潜在的威胁，并且不允许在与系统相关的操作中使用这些值，比如写文件、执行系统命令等等。

`-w` 作用与 `use warning` 相同，会抛出一些有用的警告信息，如 `using uninitialized variable`。

为了更清晰的表述该问题，我抽象出一个简单的示例程序：

```perl
#!/usr/bin/perl -wT

use strict;
use warnings;

use Digest::MD5;

my $DIR_PATH="/var/tmp";
my $PREFIX = "somedemotmpfile";

sub make_file {
    my ($filename) = @_;

    open my $fh, '>', $filename;
    print {$fh} "1" . "\n";
    print {$fh} "2" . "\n";
    print {$fh} "3" . "\n";
    close $fh;
}

sub make_tmpfile {
    foreach (1..5){
    my $tmpfilename = "$DIR_PATH/$PREFIX-" . Digest::MD5::md5_hex($_ . time() . $$);
    make_file($tmpfilename);
    }
}


sub clean_tmpfile {
    opendir (my $dh, $DIR_PATH) || die "Can not open $DIR_PATH/n";
    my @dots=grep { !/^\.+$/ } readdir($dh);
    closedir($dh);

    foreach my $file (@dots)
    {
    my $afile = "$DIR_PATH/$file";
    my $now = time();
    if (-e $afile && $afile =~ m/(^.*$PREFIX.*$)/) {
        #$afile = $1;
        my $mtime = (stat ($afile))[9];
        my $margin = $now - $mtime;
        print("$afile - Last change: $mtime - now: $now - margin(s): $margin\n");
        eval {
            unlink $afile;
        };
        warn $@ if $@;
    }
    }
}

sub main {
    make_tmpfile();
    clean_tmpfile();
}

main();
```

执行该程序，得到如下输出：
```bash
# perl -T ../tmpfile.pl
/var/tmp/somedemotmpfile-e48d74ec998a1462661eb11b7576d7e5 - Last change: 1658904122 - now: 1658904122 - margin(s): 0
Insecure dependency in unlink while running with -T switch at ../tmpfile.pl line 44.
/var/tmp/somedemotmpfile-a071ba8e02d34ef2878d7a698a22b93c - Last change: 1658904122 - now: 1658904122 - margin(s): 0
Insecure dependency in unlink while running with -T switch at ../tmpfile.pl line 44.
/var/tmp/somedemotmpfile-1a63c4b7965dc50c519e7aa68c8b081a - Last change: 1658904122 - now: 1658904122 - margin(s): 0
Insecure dependency in unlink while running with -T switch at ../tmpfile.pl line 44.
```

可以看到，当我从文件系统读取一些文件，并尝试直接删除这些问题时，这步操作被阻止，并报出警告 `Insecure dependency in unlink while running with -T switch`。

为了消除“污染”，最简单的方法是使用严格正则匹配后的结果再做操作，代码修改如下：

```
diff --git a/study_perl/tmpfile.pl b/study_perl/tmpfile.pl
index 6520a25..51ef684 100644
--- a/study_perl/tmpfile.pl
+++ b/study_perl/tmpfile.pl
@@ -36,7 +36,7 @@ sub clean_tmpfile {
     my $afile = "$DIR_PATH/$file";
     my $now = time();
     if (-e $afile && $afile =~ m/(^.*$PREFIX.*$)/) {
-        #$afile = $1;
+        $afile = $1;
         my $mtime = (stat ($afile))[9];
         my $margin = $now - $mtime;
         print("$afile - Last change: $mtime - now: $now - margin(s): $margin\n");
```

再次尝试运行，得到正确的结果：

```
# perl -T ../tmpfile.pl
/var/tmp/somedemotmpfile-f036c279daa16297818f6ec2dad9f338 - Last change: 1658904375 - now: 1658904375 - margin(s): 0
/var/tmp/somedemotmpfile-f532d49f86ae1c486ec593c71a073e73 - Last change: 1658904375 - now: 1658904375 - margin(s): 0
/var/tmp/somedemotmpfile-e48d74ec998a1462661eb11b7576d7e5 - Last change: 1658904122 - now: 1658904375 - margin(s): 253
/var/tmp/somedemotmpfile-a071ba8e02d34ef2878d7a698a22b93c - Last change: 1658904122 - now: 1658904375 - margin(s): 253
/var/tmp/somedemotmpfile-a140c4f6095a0431194a91ead41ce605 - Last change: 1658904375 - now: 1658904375 - margin(s): 0
/var/tmp/somedemotmpfile-1a63c4b7965dc50c519e7aa68c8b081a - Last change: 1658904122 - now: 1658904375 - margin(s): 253
```

执行成功，且删除了之前的残留文件。

经过这次问题解决，发现 Perl 在安全方面的特性值得学习，在编译或解释层面阻挡常见安全操作被执行，可以使得我们写出更加安全的代码。

即使不写 perl 代码，使用其他语言写程序时也可有所启发。

## 参考文献

- [What is the significance of -T or -w in #!/usr/bin/perl?](https://stackoverflow.com/questions/11256876/what-is-the-significance-of-t-or-w-in-usr-bin-perl)
- [How do I get a file's last modified time in Perl?](https://stackoverflow.com/questions/509576/how-do-i-get-a-files-last-modified-time-in-perl)
- [How to create a new file in Perl?](https://stackoverflow.com/questions/11031350/how-to-create-a-new-file-in-perl)
- [Perl正则表达式超详细教程](https://www.cnblogs.com/f-ck-need-u/p/9648439.html)
- [Perl的流程控制语句](https://www.junmajinlong.com/perl/perl_flow_control/)