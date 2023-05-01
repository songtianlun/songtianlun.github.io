---
title: "解决 MySQL 报错 “ Column count of mysql.user is wrong...”"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "264"
date: "2019-11-23 20:34:00"
---

新建 MySQL 账户报错：
```
Column count of mysql.user is wrong. Expected 45, found 43. Created with MySQL 5 
```

错误是由于你曾经升级过数据库，升级完后没有使用mysql_upgrade升级数据结构造成的。

解决办法：使用`mysql_upgrade`命令

```
$  mysql_upgrade -u root -p 
Enter password: 
Checking if update is needed.
Checking server version.
Running queries to upgrade MySQL server.
Checking system database.
mysql.columns_priv                                 OK
mysql.db                                           OK
mysql.engine_cost                                  OK
mysql.event                                        OK
mysql.func                                         OK
mysql.general_log                                  OK
mysql.gtid_executed                                OK
mysql.help_category                                OK
mysql.help_keyword                                 OK
mysql.help_relation                                OK
mysql.help_topic                                   OK
mysql.innodb_index_stats                           OK
mysql.innodb_table_stats                           OK
mysql.ndb_binlog_index                             OK
mysql.plugin                                       OK
mysql.proc                                         OK
mysql.procs_priv                                   OK
mysql.proxies_priv                                 OK
mysql.server_cost                                  OK
mysql.servers                                      OK
mysql.slave_master_info                            OK
mysql.slave_relay_log_info                         OK
mysql.slave_worker_info                            OK
mysql.slow_log                                     OK
mysql.tables_priv                                  OK
mysql.time_zone                                    OK
mysql.time_zone_leap_second                        OK
mysql.time_zone_name                               OK
mysql.time_zone_transition                         OK
mysql.time_zone_transition_type                    OK
mysql.user                                         OK
Upgrading the sys schema.
Checking databases.
pan.oc_accounts                                    OK
pan.oc_activity                                    OK
pan.oc_activity_mq                                 OK
pan.oc_addressbookchanges                          OK
pan.oc_addressbooks                                OK
pan.oc_appconfig                                   OK
pan.oc_authtoken                                   OK
pan.oc_bruteforce_attempts                         OK
pan.oc_calendar_invitations                        OK
pan.oc_calendar_reminders                          OK
pan.oc_calendar_resources                          OK
pan.oc_calendar_resources_md                       OK
pan.oc_calendar_rooms                              OK
pan.oc_calendar_rooms_md                           OK
pan.oc_calendarchanges                             OK
pan.oc_calendarobjects                             OK
pan.oc_calendarobjects_props                       OK
pan.oc_calendars                                   OK
pan.oc_calendarsubscriptions                       OK
pan.oc_cards                                       OK
pan.oc_cards_properties                            OK
pan.oc_collres_accesscache                         OK
pan.oc_collres_collections                         OK
pan.oc_collres_resources                           OK
pan.oc_comments                                    OK
pan.oc_comments_read_markers                       OK
pan.oc_credentials                                 OK
pan.oc_dav_cal_proxy                               OK
pan.oc_dav_shares                                  OK
pan.oc_directlink                                  OK
pan.oc_external_applicable                         OK
pan.oc_external_config                             OK
pan.oc_external_mounts                             OK
pan.oc_external_options                            OK
pan.oc_federated_reshares                          OK
pan.oc_file_locks                                  OK
pan.oc_filecache                                   OK
pan.oc_filecache_extended                          OK
pan.oc_files_trash                                 OK
pan.oc_flow_checks                                 OK
pan.oc_flow_operations                             OK
pan.oc_group_admin                                 OK
pan.oc_group_user                                  OK
pan.oc_groups                                      OK
pan.oc_jobs                                        OK
pan.oc_login_flow_v2                               OK
pan.oc_maps_address_geo                            OK
pan.oc_maps_apikeys                                OK
pan.oc_maps_device_points                          OK
pan.oc_maps_devices                                OK
pan.oc_maps_favorites                              OK
pan.oc_maps_photos                                 OK
pan.oc_maps_tracks                                 OK
pan.oc_migrations                                  OK
pan.oc_mimetypes                                   OK
pan.oc_mounts                                      OK
pan.oc_notes_meta                                  OK
pan.oc_notifications                               OK
pan.oc_notifications_pushtokens                    OK
pan.oc_oauth2_access_tokens                        OK
pan.oc_oauth2_clients                              OK
pan.oc_ocdownloader_adminsettings                  OK
pan.oc_ocdownloader_personalsettings               OK
pan.oc_ocdownloader_queue                          OK
pan.oc_phonetrack_devices                          OK
pan.oc_phonetrack_filtersb                         OK
pan.oc_phonetrack_geofences                        OK
pan.oc_phonetrack_points                           OK
pan.oc_phonetrack_proxims                          OK
pan.oc_phonetrack_pubshares                        OK
pan.oc_phonetrack_sessions                         OK
pan.oc_phonetrack_shares                           OK
pan.oc_phonetrack_tileserver                       OK
pan.oc_preferences                                 OK
pan.oc_privacy_admins                              OK
pan.oc_properties                                  OK
pan.oc_schedulingobjects                           OK
pan.oc_share                                       OK
pan.oc_share_external                              OK
pan.oc_storages                                    OK
pan.oc_systemtag                                   OK
pan.oc_systemtag_group                             OK
pan.oc_systemtag_object_mapping                    OK
pan.oc_talk_commands                               OK
pan.oc_talk_guests                                 OK
pan.oc_talk_participants                           OK
pan.oc_talk_rooms                                  OK
pan.oc_talk_signaling                              OK
pan.oc_text_documents                              OK
pan.oc_text_sessions                               OK
pan.oc_text_steps                                  OK
pan.oc_trusted_servers                             OK
pan.oc_twofactor_backupcodes                       OK
pan.oc_twofactor_providers                         OK
pan.oc_users                                       OK
pan.oc_vcategory                                   OK
pan.oc_vcategory_to_object                         OK
pan.oc_whats_new                                   OK
sys.sys_config                                     OK
Upgrade process completed successfully.
Checking if update is needed.

```


## 参考文献

 - [ERROR 3009 (HY000): Column count of mysql.user is wrong. Expected 45, found 43. Created with MySQL 5](https://blog.csdn.net/yabingshi_tech/article/details/73467732)