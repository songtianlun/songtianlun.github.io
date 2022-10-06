#!/usr/bin/perl

use strict;
use warnings;
use JSON;
use LWP::Simple;

sub pretty_print_hash {
    my ($hash, $just_return) = @_;
    my $json = new JSON;
    my $json_text = $json->pretty->encode($hash);
    return $json_text if $just_return;
    print "$json_text\n";
}

sub get_uploader {
    my ($gitea_api_key) = @_;

    my $cmd = "curl -X 'GET' ".
        "'https://git.frytea.local/api/v1/repos/songtianlun/upload-s3/releases' ".
        "-H 'accept: application/json' ".
        "-H 'authorization: token $gitea_api_key' ".
        "-k";
    # print("$cmd\n");

    my $res = `$cmd 2>/dev/null`;

    # print("---\n");

    eval {$res = decode_json("$res") if ($res);};
    die "err:$@\nres:$res\n" if ($@);

    # pretty_print_hash($res);

    my $file_url = $res->[0]->{assets}->[1]->{browser_download_url}
        if ($res && $res->[0] && $res->[0]->{assets} && $res->[0]->{assets}->[1]);

    die "cannot get uploader file url\n" if (!$file_url || $file_url eq "");

    print $file_url, "\n";

    system("curl -k -s -L ".
    "-H 'authorization: token $gitea_api_key' ".
    "$file_url -o uploader");
}

get_uploader();
