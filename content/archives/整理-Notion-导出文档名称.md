---
title: "整理 Notion 导出文档名称"
categories: [ "技术" ]
tags: [ "Perl","notion" ]
draft: false
slug: "743"
date: "2023-02-28 19:40:56"
---

从 Notion 导出 md 格式的文档，默认会对文件名做一些处理，

![](https://imagehost-cdn.frytea.com/images/2023/02/28/202302281809111b4ea3d003517a7d.png)

大概是这样，会讲过长的文档名称压缩，在首行使用 md 一级标签标记文件名，再将文档截断为图示的样子。

这样的文档导入其他笔记软件是很不方便的，特别是内容多了就很不方便。

为此准备了一个 perl 的脚本来处理。

整理前文件清单如下：

![](https://imagehost-cdn.frytea.com/images/2023/02/28/202302281812239249b5e2a616df1a.png)

整理后自动将第一个一级标题作为文件名，并自动将文件名等于首行标题的首行去掉。

以下是 Perl 源码。整理后直接运行即可：

```perl
#!/usr/bin/perl -w

use strict;
use warnings;

my $target_dir = $ARGV[0];

collate_name_with_title($target_dir);
scan_with_remove_first_line($target_dir);

sub collate_name_with_title {
    my $target_dir = shift;
    
    my $file_re = qr/^.*\s[0-9a-z]{5}\.md$/;

    for my $file (glob "$target_dir/*.md") {
        if ($file =~ $file_re) {
            open my $fh, '<', $file or die "Can't open $file: $!";
            my $line = <$fh>;
            close $fh;
            chomp $line;
            if ($line =~ /^#\s(.*)$/) {
                my $title = $1;
                $title =~ s/\s//g;
                $title =~ s/[|.:\/]/-/g;
                print "$file: \t$title\n";
                rename $file, "$target_dir/$title.md";
            }
        }
    }
}

sub scan_with_remove_first_line {
    my $target_dir = shift;

    for my $file (glob "$target_dir/*.md") {
        open my $fh, '<', $file or die "Can't open $file: $!";
        $file =~ /$target_dir\/(.*)\.md$/;
        my $file_name = $1;
        my @lines = <$fh>;
        close $fh;
        my $title = $lines[0];
        #print "$file_name: \t$title";
        chomp $title if $title;
        if ($title && $title =~ /^#\s(.*)$/) {
            $title = $1;
            if ($title eq $file_name) {
                #print "file: $file\n";
                #print "$file_name: \t$title\n";
                print "remove first line: $file\n";
                remove_first_line($file);
            }
        }
    }
}

sub remove_first_line {
    my $target_file = shift;

    open my $fh, '<', $target_file or die "Can't open $target_file: $!";
    my @lines = <$fh>;
    close $fh;
    shift @lines;
    open my $fh, '>', $target_file or die "Can't open $target_file: $!";
    print $fh @lines;
    close $fh;
    
}
```

运行方法：

```bash
$  perl collate-md-name-export-by-notion.pl ~/Documents/MyWiki/Note
...
```

记得备份数据，避免误操作导致数据丢失！



