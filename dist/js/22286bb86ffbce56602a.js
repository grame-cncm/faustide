(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/redshift/redshift.js":
/*!********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/redshift/redshift.js ***!
  \********************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var conf = {
    comments: {
        lineComment: '--',
        blockComment: ['/*', '*/'],
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.sql',
    ignoreCase: true,
    brackets: [
        { open: '[', close: ']', token: 'delimiter.square' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' }
    ],
    keywords: [
        "AES128", "AES256", "ALL", "ALLOWOVERWRITE", "ANALYSE", "ANALYZE", "AND", "ANY", "ARRAY", "AS", "ASC", "AUTHORIZATION",
        "BACKUP", "BETWEEN", "BINARY", "BLANKSASNULL", "BOTH", "BYTEDICT", "BZIP2", "CASE", "CAST", "CHECK", "COLLATE", "COLUMN",
        "CONSTRAINT", "CREATE", "CREDENTIALS", "CROSS", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_USER",
        "CURRENT_USER_ID", "DEFAULT", "DEFERRABLE", "DEFLATE", "DEFRAG", "DELTA", "DELTA32K", "DESC", "DISABLE", "DISTINCT", "DO",
        "ELSE", "EMPTYASNULL", "ENABLE", "ENCODE", "ENCRYPT", "ENCRYPTION", "END", "EXCEPT", "EXPLICIT", "FALSE", "FOR", "FOREIGN",
        "FREEZE", "FROM", "FULL", "GLOBALDICT256", "GLOBALDICT64K", "GRANT", "GROUP", "GZIP", "HAVING", "IDENTITY", "IGNORE", "ILIKE",
        "IN", "INITIALLY", "INNER", "INTERSECT", "INTO", "IS", "ISNULL", "JOIN", "LEADING", "LEFT", "LIKE", "LIMIT", "LOCALTIME",
        "LOCALTIMESTAMP", "LUN", "LUNS", "LZO", "LZOP", "MINUS", "MOSTLY13", "MOSTLY32", "MOSTLY8", "NATURAL", "NEW", "NOT", "NOTNULL",
        "NULL", "NULLS", "OFF", "OFFLINE", "OFFSET", "OID", "OLD", "ON", "ONLY", "OPEN", "OR", "ORDER", "OUTER", "OVERLAPS", "PARALLEL",
        "PARTITION", "PERCENT", "PERMISSIONS", "PLACING", "PRIMARY", "RAW", "READRATIO", "RECOVER", "REFERENCES", "RESPECT", "REJECTLOG",
        "RESORT", "RESTORE", "RIGHT", "SELECT", "SESSION_USER", "SIMILAR", "SNAPSHOT", "SOME", "SYSDATE", "SYSTEM", "TABLE", "TAG",
        "TDES", "TEXT255", "TEXT32K", "THEN", "TIMESTAMP", "TO", "TOP", "TRAILING", "TRUE", "TRUNCATECOLUMNS", "UNION", "UNIQUE", "USER",
        "USING", "VERBOSE", "WALLET", "WHEN", "WHERE", "WITH", "WITHOUT"
    ],
    operators: [
        "AND", "BETWEEN", "IN", "LIKE", "NOT", "OR", "IS", "NULL", "INTERSECT", "UNION", "INNER", "JOIN", "LEFT", "OUTER", "RIGHT"
    ],
    builtinFunctions: [
        "current_schema", "current_schemas", "has_database_privilege", "has_schema_privilege", "has_table_privilege", "age",
        "current_time", "current_timestamp", "localtime", "isfinite", "now", "ascii", "get_bit", "get_byte", "set_bit", "set_byte",
        "to_ascii", "approximate percentile_disc", "avg", "count", "listagg", "max", "median", "min", "percentile_cont", "stddev_samp",
        "stddev_pop", "sum", "var_samp", "var_pop", "bit_and", "bit_or", "bool_and", "bool_or", "cume_dist", "first_value", "lag",
        "last_value", "lead", "nth_value", "ratio_to_report", "dense_rank", "ntile", "percent_rank", "rank", "row_number", "case",
        "coalesce", "decode", "greatest", "least", "nvl", "nvl2", "nullif", "add_months", "at time zone", "convert_timezone",
        "current_date", "date_cmp", "date_cmp_timestamp", "date_cmp_timestamptz", "date_part_year", "dateadd", "datediff",
        "date_part", "date_trunc", "extract", "getdate", "interval_cmp", "last_day", "months_between", "next_day", "sysdate",
        "timeofday", "timestamp_cmp", "timestamp_cmp_date", "timestamp_cmp_timestamptz", "timestamptz_cmp", "timestamptz_cmp_date",
        "timestamptz_cmp_timestamp", "timezone", "to_timestamp", "trunc", "abs", "acos", "asin", "atan", "atan2", "cbrt", "ceil",
        "ceiling", "checksum", "cos", "cot", "degrees", "dexp", "dlog1", "dlog10", "exp", "floor", "ln", "log", "mod", "pi", "power",
        "radians", "random", "round", "sin", "sign", "sqrt", "tan", "to_hex", "bpcharcmp", "btrim", "bttext_pattern_cmp", "char_length",
        "character_length", "charindex", "chr", "concat", "crc32", "func_sha1", "initcap", "left and rights", "len", "length", "lower",
        "lpad and rpads", "ltrim", "md5", "octet_length", "position", "quote_ident", "quote_literal", "regexp_count", "regexp_instr",
        "regexp_replace", "regexp_substr", "repeat", "replace", "replicate", "reverse", "rtrim", "split_part", "strpos", "strtol",
        "substring", "textlen", "translate", "trim", "upper", "cast", "convert", "to_char", "to_date", "to_number", "json_array_length",
        "json_extract_array_element_text", "json_extract_path_text", "current_setting", "pg_cancel_backend", "pg_terminate_backend",
        "set_config", "current_database", "current_user", "current_user_id", "pg_backend_pid", "pg_last_copy_count", "pg_last_copy_id",
        "pg_last_query_id", "pg_last_unload_count", "session_user", "slice_num", "user", "version", "abbrev", "acosd", "any", "area",
        "array_agg", "array_append", "array_cat", "array_dims", "array_fill", "array_length", "array_lower", "array_ndims",
        "array_position", "array_positions", "array_prepend", "array_remove", "array_replace", "array_to_json", "array_to_string",
        "array_to_tsvector", "array_upper", "asind", "atan2d", "atand", "bit", "bit_length", "bound_box", "box",
        "brin_summarize_new_values", "broadcast", "cardinality", "center", "circle", "clock_timestamp", "col_description", "concat_ws",
        "convert_from", "convert_to", "corr", "cosd", "cotd", "covar_pop", "covar_samp", "current_catalog", "current_query",
        "current_role", "currval", "cursor_to_xml", "diameter", "div", "encode", "enum_first", "enum_last", "enum_range", "every",
        "family", "format", "format_type", "generate_series", "generate_subscripts", "get_current_ts_config", "gin_clean_pending_list",
        "grouping", "has_any_column_privilege", "has_column_privilege", "has_foreign_data_wrapper_privilege", "has_function_privilege",
        "has_language_privilege", "has_sequence_privilege", "has_server_privilege", "has_tablespace_privilege", "has_type_privilege",
        "height", "host", "hostmask", "inet_client_addr", "inet_client_port", "inet_merge", "inet_same_family", "inet_server_addr",
        "inet_server_port", "isclosed", "isempty", "isopen", "json_agg", "json_object", "json_object_agg", "json_populate_record",
        "json_populate_recordset", "json_to_record", "json_to_recordset", "jsonb_agg", "jsonb_object_agg", "justify_days", "justify_hours",
        "justify_interval", "lastval", "left", "line", "localtimestamp", "lower_inc", "lower_inf", "lpad", "lseg", "make_date",
        "make_interval", "make_time", "make_timestamp", "make_timestamptz", "masklen", "mode", "netmask", "network", "nextval", "npoints",
        "num_nonnulls", "num_nulls", "numnode", "obj_description", "overlay", "parse_ident", "path", "pclose", "percentile_disc",
        "pg_advisory_lock", "pg_advisory_lock_shared", "pg_advisory_unlock", "pg_advisory_unlock_all", "pg_advisory_unlock_shared",
        "pg_advisory_xact_lock", "pg_advisory_xact_lock_shared", "pg_backup_start_time", "pg_blocking_pids", "pg_client_encoding",
        "pg_collation_is_visible", "pg_column_size", "pg_conf_load_time", "pg_control_checkpoint", "pg_control_init", "pg_control_recovery",
        "pg_control_system", "pg_conversion_is_visible", "pg_create_logical_replication_slot", "pg_create_physical_replication_slot",
        "pg_create_restore_point", "pg_current_xlog_flush_location", "pg_current_xlog_insert_location", "pg_current_xlog_location",
        "pg_database_size", "pg_describe_object", "pg_drop_replication_slot", "pg_export_snapshot", "pg_filenode_relation",
        "pg_function_is_visible", "pg_get_constraintdef", "pg_get_expr", "pg_get_function_arguments", "pg_get_function_identity_arguments",
        "pg_get_function_result", "pg_get_functiondef", "pg_get_indexdef", "pg_get_keywords", "pg_get_object_address",
        "pg_get_owned_sequence", "pg_get_ruledef", "pg_get_serial_sequence", "pg_get_triggerdef", "pg_get_userbyid", "pg_get_viewdef",
        "pg_has_role", "pg_identify_object", "pg_identify_object_as_address", "pg_index_column_has_property", "pg_index_has_property",
        "pg_indexam_has_property", "pg_indexes_size", "pg_is_in_backup", "pg_is_in_recovery", "pg_is_other_temp_schema",
        "pg_is_xlog_replay_paused", "pg_last_committed_xact", "pg_last_xact_replay_timestamp", "pg_last_xlog_receive_location",
        "pg_last_xlog_replay_location", "pg_listening_channels", "pg_logical_emit_message", "pg_logical_slot_get_binary_changes",
        "pg_logical_slot_get_changes", "pg_logical_slot_peek_binary_changes", "pg_logical_slot_peek_changes", "pg_ls_dir",
        "pg_my_temp_schema", "pg_notification_queue_usage", "pg_opclass_is_visible", "pg_operator_is_visible", "pg_opfamily_is_visible",
        "pg_options_to_table", "pg_postmaster_start_time", "pg_read_binary_file", "pg_read_file", "pg_relation_filenode",
        "pg_relation_filepath", "pg_relation_size", "pg_reload_conf", "pg_replication_origin_create", "pg_replication_origin_drop",
        "pg_replication_origin_oid", "pg_replication_origin_progress", "pg_replication_origin_session_is_setup",
        "pg_replication_origin_session_progress", "pg_replication_origin_session_reset", "pg_replication_origin_session_setup",
        "pg_replication_origin_xact_reset", "pg_replication_origin_xact_setup", "pg_rotate_logfile", "pg_size_bytes", "pg_size_pretty",
        "pg_sleep", "pg_sleep_for", "pg_sleep_until", "pg_start_backup", "pg_stat_file", "pg_stop_backup", "pg_switch_xlog",
        "pg_table_is_visible", "pg_table_size", "pg_tablespace_databases", "pg_tablespace_location", "pg_tablespace_size",
        "pg_total_relation_size", "pg_trigger_depth", "pg_try_advisory_lock", "pg_try_advisory_lock_shared", "pg_try_advisory_xact_lock",
        "pg_try_advisory_xact_lock_shared", "pg_ts_config_is_visible", "pg_ts_dict_is_visible", "pg_ts_parser_is_visible",
        "pg_ts_template_is_visible", "pg_type_is_visible", "pg_typeof", "pg_xact_commit_timestamp", "pg_xlog_location_diff",
        "pg_xlog_replay_pause", "pg_xlog_replay_resume", "pg_xlogfile_name", "pg_xlogfile_name_offset", "phraseto_tsquery",
        "plainto_tsquery", "point", "polygon", "popen", "pqserverversion", "query_to_xml", "querytree", "quote_nullable", "radius",
        "range_merge", "regexp_matches", "regexp_split_to_array", "regexp_split_to_table", "regr_avgx", "regr_avgy", "regr_count",
        "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "right", "row_security_active", "row_to_json",
        "rpad", "scale", "set_masklen", "setseed", "setval", "setweight", "shobj_description", "sind", "sprintf", "statement_timestamp",
        "stddev", "string_agg", "string_to_array", "strip", "substr", "table_to_xml", "table_to_xml_and_xmlschema", "tand", "text",
        "to_json", "to_regclass", "to_regnamespace", "to_regoper", "to_regoperator", "to_regproc", "to_regprocedure", "to_regrole",
        "to_regtype", "to_tsquery", "to_tsvector", "transaction_timestamp", "ts_debug", "ts_delete", "ts_filter", "ts_headline",
        "ts_lexize", "ts_parse", "ts_rank", "ts_rank_cd", "ts_rewrite", "ts_stat", "ts_token_type", "tsquery_phrase", "tsvector_to_array",
        "tsvector_update_trigger", "tsvector_update_trigger_column", "txid_current", "txid_current_snapshot", "txid_snapshot_xip",
        "txid_snapshot_xmax", "txid_snapshot_xmin", "txid_visible_in_snapshot", "unnest", "upper_inc", "upper_inf", "variance", "width",
        "width_bucket", "xml_is_well_formed", "xml_is_well_formed_content", "xml_is_well_formed_document", "xmlagg", "xmlcomment",
        "xmlconcat", "xmlelement", "xmlexists", "xmlforest", "xmlparse", "xmlpi", "xmlroot", "xmlserialize", "xpath", "xpath_exists"
    ],
    builtinVariables: [
    // NOT SUPPORTED
    ],
    pseudoColumns: [
    // NOT SUPPORTED
    ],
    tokenizer: {
        root: [
            { include: '@comments' },
            { include: '@whitespace' },
            { include: '@pseudoColumns' },
            { include: '@numbers' },
            { include: '@strings' },
            { include: '@complexIdentifiers' },
            { include: '@scopes' },
            [/[;,.]/, 'delimiter'],
            [/[()]/, '@brackets'],
            [/[\w@#$]+/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@operators': 'operator',
                        '@builtinVariables': 'predefined',
                        '@builtinFunctions': 'predefined',
                        '@default': 'identifier'
                    }
                }],
            [/[<>=!%&+\-*/|~^]/, 'operator'],
        ],
        whitespace: [
            [/\s+/, 'white']
        ],
        comments: [
            [/--+.*/, 'comment'],
            [/\/\*/, { token: 'comment.quote', next: '@comment' }]
        ],
        comment: [
            [/[^*/]+/, 'comment'],
            // Not supporting nested comments, as nested comments seem to not be standard?
            // i.e. http://stackoverflow.com/questions/728172/are-there-multiline-comment-delimiters-in-sql-that-are-vendor-agnostic
            // [/\/\*/, { token: 'comment.quote', next: '@push' }],    // nested comment not allowed :-(
            [/\*\//, { token: 'comment.quote', next: '@pop' }],
            [/./, 'comment']
        ],
        pseudoColumns: [
            [/[$][A-Za-z_][\w@#$]*/, {
                    cases: {
                        '@pseudoColumns': 'predefined',
                        '@default': 'identifier'
                    }
                }],
        ],
        numbers: [
            [/0[xX][0-9a-fA-F]*/, 'number'],
            [/[$][+-]*\d*(\.\d*)?/, 'number'],
            [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']
        ],
        strings: [
            [/'/, { token: 'string', next: '@string' }],
        ],
        string: [
            [/[^']+/, 'string'],
            [/''/, 'string'],
            [/'/, { token: 'string', next: '@pop' }]
        ],
        complexIdentifiers: [
            [/"/, { token: 'identifier.quote', next: '@quotedIdentifier' }]
        ],
        quotedIdentifier: [
            [/[^"]+/, 'identifier'],
            [/""/, 'identifier'],
            [/"/, { token: 'identifier.quote', next: '@pop' }]
        ],
        scopes: [
        // NOT SUPPORTED
        ]
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3JlZHNoaWZ0L3JlZHNoaWZ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNhO0FBQ047QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DO0FBQ0E7QUFDQSxTQUFTLFNBQVMsWUFBWSxHQUFHO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsMEJBQTBCO0FBQ25DO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxtREFBbUQ7QUFDNUQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLGlDQUFpQztBQUM5QyxhQUFhLHFCQUFxQjtBQUNsQyxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDJDQUEyQztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHdDQUF3QztBQUNqRSxzQkFBc0IsdUNBQXVDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUNBQW1DO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0EsbUJBQW1CLHVEQUF1RDtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwQ0FBMEM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzLzIyMjg2YmI4NmZmYmNlNTY2MDJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4ndXNlIHN0cmljdCc7XG5leHBvcnQgdmFyIGNvbmYgPSB7XG4gICAgY29tbWVudHM6IHtcbiAgICAgICAgbGluZUNvbW1lbnQ6ICctLScsXG4gICAgICAgIGJsb2NrQ29tbWVudDogWycvKicsICcqLyddLFxuICAgIH0sXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgWyd7JywgJ30nXSxcbiAgICAgICAgWydbJywgJ10nXSxcbiAgICAgICAgWycoJywgJyknXVxuICAgIF0sXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF1cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIGRlZmF1bHRUb2tlbjogJycsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLnNxbCcsXG4gICAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgICBicmFja2V0czogW1xuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJywgdG9rZW46ICdkZWxpbWl0ZXIuc3F1YXJlJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJywgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnIH1cbiAgICBdLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgIFwiQUVTMTI4XCIsIFwiQUVTMjU2XCIsIFwiQUxMXCIsIFwiQUxMT1dPVkVSV1JJVEVcIiwgXCJBTkFMWVNFXCIsIFwiQU5BTFlaRVwiLCBcIkFORFwiLCBcIkFOWVwiLCBcIkFSUkFZXCIsIFwiQVNcIiwgXCJBU0NcIiwgXCJBVVRIT1JJWkFUSU9OXCIsXG4gICAgICAgIFwiQkFDS1VQXCIsIFwiQkVUV0VFTlwiLCBcIkJJTkFSWVwiLCBcIkJMQU5LU0FTTlVMTFwiLCBcIkJPVEhcIiwgXCJCWVRFRElDVFwiLCBcIkJaSVAyXCIsIFwiQ0FTRVwiLCBcIkNBU1RcIiwgXCJDSEVDS1wiLCBcIkNPTExBVEVcIiwgXCJDT0xVTU5cIixcbiAgICAgICAgXCJDT05TVFJBSU5UXCIsIFwiQ1JFQVRFXCIsIFwiQ1JFREVOVElBTFNcIiwgXCJDUk9TU1wiLCBcIkNVUlJFTlRfREFURVwiLCBcIkNVUlJFTlRfVElNRVwiLCBcIkNVUlJFTlRfVElNRVNUQU1QXCIsIFwiQ1VSUkVOVF9VU0VSXCIsXG4gICAgICAgIFwiQ1VSUkVOVF9VU0VSX0lEXCIsIFwiREVGQVVMVFwiLCBcIkRFRkVSUkFCTEVcIiwgXCJERUZMQVRFXCIsIFwiREVGUkFHXCIsIFwiREVMVEFcIiwgXCJERUxUQTMyS1wiLCBcIkRFU0NcIiwgXCJESVNBQkxFXCIsIFwiRElTVElOQ1RcIiwgXCJET1wiLFxuICAgICAgICBcIkVMU0VcIiwgXCJFTVBUWUFTTlVMTFwiLCBcIkVOQUJMRVwiLCBcIkVOQ09ERVwiLCBcIkVOQ1JZUFRcIiwgXCJFTkNSWVBUSU9OXCIsIFwiRU5EXCIsIFwiRVhDRVBUXCIsIFwiRVhQTElDSVRcIiwgXCJGQUxTRVwiLCBcIkZPUlwiLCBcIkZPUkVJR05cIixcbiAgICAgICAgXCJGUkVFWkVcIiwgXCJGUk9NXCIsIFwiRlVMTFwiLCBcIkdMT0JBTERJQ1QyNTZcIiwgXCJHTE9CQUxESUNUNjRLXCIsIFwiR1JBTlRcIiwgXCJHUk9VUFwiLCBcIkdaSVBcIiwgXCJIQVZJTkdcIiwgXCJJREVOVElUWVwiLCBcIklHTk9SRVwiLCBcIklMSUtFXCIsXG4gICAgICAgIFwiSU5cIiwgXCJJTklUSUFMTFlcIiwgXCJJTk5FUlwiLCBcIklOVEVSU0VDVFwiLCBcIklOVE9cIiwgXCJJU1wiLCBcIklTTlVMTFwiLCBcIkpPSU5cIiwgXCJMRUFESU5HXCIsIFwiTEVGVFwiLCBcIkxJS0VcIiwgXCJMSU1JVFwiLCBcIkxPQ0FMVElNRVwiLFxuICAgICAgICBcIkxPQ0FMVElNRVNUQU1QXCIsIFwiTFVOXCIsIFwiTFVOU1wiLCBcIkxaT1wiLCBcIkxaT1BcIiwgXCJNSU5VU1wiLCBcIk1PU1RMWTEzXCIsIFwiTU9TVExZMzJcIiwgXCJNT1NUTFk4XCIsIFwiTkFUVVJBTFwiLCBcIk5FV1wiLCBcIk5PVFwiLCBcIk5PVE5VTExcIixcbiAgICAgICAgXCJOVUxMXCIsIFwiTlVMTFNcIiwgXCJPRkZcIiwgXCJPRkZMSU5FXCIsIFwiT0ZGU0VUXCIsIFwiT0lEXCIsIFwiT0xEXCIsIFwiT05cIiwgXCJPTkxZXCIsIFwiT1BFTlwiLCBcIk9SXCIsIFwiT1JERVJcIiwgXCJPVVRFUlwiLCBcIk9WRVJMQVBTXCIsIFwiUEFSQUxMRUxcIixcbiAgICAgICAgXCJQQVJUSVRJT05cIiwgXCJQRVJDRU5UXCIsIFwiUEVSTUlTU0lPTlNcIiwgXCJQTEFDSU5HXCIsIFwiUFJJTUFSWVwiLCBcIlJBV1wiLCBcIlJFQURSQVRJT1wiLCBcIlJFQ09WRVJcIiwgXCJSRUZFUkVOQ0VTXCIsIFwiUkVTUEVDVFwiLCBcIlJFSkVDVExPR1wiLFxuICAgICAgICBcIlJFU09SVFwiLCBcIlJFU1RPUkVcIiwgXCJSSUdIVFwiLCBcIlNFTEVDVFwiLCBcIlNFU1NJT05fVVNFUlwiLCBcIlNJTUlMQVJcIiwgXCJTTkFQU0hPVFwiLCBcIlNPTUVcIiwgXCJTWVNEQVRFXCIsIFwiU1lTVEVNXCIsIFwiVEFCTEVcIiwgXCJUQUdcIixcbiAgICAgICAgXCJUREVTXCIsIFwiVEVYVDI1NVwiLCBcIlRFWFQzMktcIiwgXCJUSEVOXCIsIFwiVElNRVNUQU1QXCIsIFwiVE9cIiwgXCJUT1BcIiwgXCJUUkFJTElOR1wiLCBcIlRSVUVcIiwgXCJUUlVOQ0FURUNPTFVNTlNcIiwgXCJVTklPTlwiLCBcIlVOSVFVRVwiLCBcIlVTRVJcIixcbiAgICAgICAgXCJVU0lOR1wiLCBcIlZFUkJPU0VcIiwgXCJXQUxMRVRcIiwgXCJXSEVOXCIsIFwiV0hFUkVcIiwgXCJXSVRIXCIsIFwiV0lUSE9VVFwiXG4gICAgXSxcbiAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgXCJBTkRcIiwgXCJCRVRXRUVOXCIsIFwiSU5cIiwgXCJMSUtFXCIsIFwiTk9UXCIsIFwiT1JcIiwgXCJJU1wiLCBcIk5VTExcIiwgXCJJTlRFUlNFQ1RcIiwgXCJVTklPTlwiLCBcIklOTkVSXCIsIFwiSk9JTlwiLCBcIkxFRlRcIiwgXCJPVVRFUlwiLCBcIlJJR0hUXCJcbiAgICBdLFxuICAgIGJ1aWx0aW5GdW5jdGlvbnM6IFtcbiAgICAgICAgXCJjdXJyZW50X3NjaGVtYVwiLCBcImN1cnJlbnRfc2NoZW1hc1wiLCBcImhhc19kYXRhYmFzZV9wcml2aWxlZ2VcIiwgXCJoYXNfc2NoZW1hX3ByaXZpbGVnZVwiLCBcImhhc190YWJsZV9wcml2aWxlZ2VcIiwgXCJhZ2VcIixcbiAgICAgICAgXCJjdXJyZW50X3RpbWVcIiwgXCJjdXJyZW50X3RpbWVzdGFtcFwiLCBcImxvY2FsdGltZVwiLCBcImlzZmluaXRlXCIsIFwibm93XCIsIFwiYXNjaWlcIiwgXCJnZXRfYml0XCIsIFwiZ2V0X2J5dGVcIiwgXCJzZXRfYml0XCIsIFwic2V0X2J5dGVcIixcbiAgICAgICAgXCJ0b19hc2NpaVwiLCBcImFwcHJveGltYXRlIHBlcmNlbnRpbGVfZGlzY1wiLCBcImF2Z1wiLCBcImNvdW50XCIsIFwibGlzdGFnZ1wiLCBcIm1heFwiLCBcIm1lZGlhblwiLCBcIm1pblwiLCBcInBlcmNlbnRpbGVfY29udFwiLCBcInN0ZGRldl9zYW1wXCIsXG4gICAgICAgIFwic3RkZGV2X3BvcFwiLCBcInN1bVwiLCBcInZhcl9zYW1wXCIsIFwidmFyX3BvcFwiLCBcImJpdF9hbmRcIiwgXCJiaXRfb3JcIiwgXCJib29sX2FuZFwiLCBcImJvb2xfb3JcIiwgXCJjdW1lX2Rpc3RcIiwgXCJmaXJzdF92YWx1ZVwiLCBcImxhZ1wiLFxuICAgICAgICBcImxhc3RfdmFsdWVcIiwgXCJsZWFkXCIsIFwibnRoX3ZhbHVlXCIsIFwicmF0aW9fdG9fcmVwb3J0XCIsIFwiZGVuc2VfcmFua1wiLCBcIm50aWxlXCIsIFwicGVyY2VudF9yYW5rXCIsIFwicmFua1wiLCBcInJvd19udW1iZXJcIiwgXCJjYXNlXCIsXG4gICAgICAgIFwiY29hbGVzY2VcIiwgXCJkZWNvZGVcIiwgXCJncmVhdGVzdFwiLCBcImxlYXN0XCIsIFwibnZsXCIsIFwibnZsMlwiLCBcIm51bGxpZlwiLCBcImFkZF9tb250aHNcIiwgXCJhdCB0aW1lIHpvbmVcIiwgXCJjb252ZXJ0X3RpbWV6b25lXCIsXG4gICAgICAgIFwiY3VycmVudF9kYXRlXCIsIFwiZGF0ZV9jbXBcIiwgXCJkYXRlX2NtcF90aW1lc3RhbXBcIiwgXCJkYXRlX2NtcF90aW1lc3RhbXB0elwiLCBcImRhdGVfcGFydF95ZWFyXCIsIFwiZGF0ZWFkZFwiLCBcImRhdGVkaWZmXCIsXG4gICAgICAgIFwiZGF0ZV9wYXJ0XCIsIFwiZGF0ZV90cnVuY1wiLCBcImV4dHJhY3RcIiwgXCJnZXRkYXRlXCIsIFwiaW50ZXJ2YWxfY21wXCIsIFwibGFzdF9kYXlcIiwgXCJtb250aHNfYmV0d2VlblwiLCBcIm5leHRfZGF5XCIsIFwic3lzZGF0ZVwiLFxuICAgICAgICBcInRpbWVvZmRheVwiLCBcInRpbWVzdGFtcF9jbXBcIiwgXCJ0aW1lc3RhbXBfY21wX2RhdGVcIiwgXCJ0aW1lc3RhbXBfY21wX3RpbWVzdGFtcHR6XCIsIFwidGltZXN0YW1wdHpfY21wXCIsIFwidGltZXN0YW1wdHpfY21wX2RhdGVcIixcbiAgICAgICAgXCJ0aW1lc3RhbXB0el9jbXBfdGltZXN0YW1wXCIsIFwidGltZXpvbmVcIiwgXCJ0b190aW1lc3RhbXBcIiwgXCJ0cnVuY1wiLCBcImFic1wiLCBcImFjb3NcIiwgXCJhc2luXCIsIFwiYXRhblwiLCBcImF0YW4yXCIsIFwiY2JydFwiLCBcImNlaWxcIixcbiAgICAgICAgXCJjZWlsaW5nXCIsIFwiY2hlY2tzdW1cIiwgXCJjb3NcIiwgXCJjb3RcIiwgXCJkZWdyZWVzXCIsIFwiZGV4cFwiLCBcImRsb2cxXCIsIFwiZGxvZzEwXCIsIFwiZXhwXCIsIFwiZmxvb3JcIiwgXCJsblwiLCBcImxvZ1wiLCBcIm1vZFwiLCBcInBpXCIsIFwicG93ZXJcIixcbiAgICAgICAgXCJyYWRpYW5zXCIsIFwicmFuZG9tXCIsIFwicm91bmRcIiwgXCJzaW5cIiwgXCJzaWduXCIsIFwic3FydFwiLCBcInRhblwiLCBcInRvX2hleFwiLCBcImJwY2hhcmNtcFwiLCBcImJ0cmltXCIsIFwiYnR0ZXh0X3BhdHRlcm5fY21wXCIsIFwiY2hhcl9sZW5ndGhcIixcbiAgICAgICAgXCJjaGFyYWN0ZXJfbGVuZ3RoXCIsIFwiY2hhcmluZGV4XCIsIFwiY2hyXCIsIFwiY29uY2F0XCIsIFwiY3JjMzJcIiwgXCJmdW5jX3NoYTFcIiwgXCJpbml0Y2FwXCIsIFwibGVmdCBhbmQgcmlnaHRzXCIsIFwibGVuXCIsIFwibGVuZ3RoXCIsIFwibG93ZXJcIixcbiAgICAgICAgXCJscGFkIGFuZCBycGFkc1wiLCBcImx0cmltXCIsIFwibWQ1XCIsIFwib2N0ZXRfbGVuZ3RoXCIsIFwicG9zaXRpb25cIiwgXCJxdW90ZV9pZGVudFwiLCBcInF1b3RlX2xpdGVyYWxcIiwgXCJyZWdleHBfY291bnRcIiwgXCJyZWdleHBfaW5zdHJcIixcbiAgICAgICAgXCJyZWdleHBfcmVwbGFjZVwiLCBcInJlZ2V4cF9zdWJzdHJcIiwgXCJyZXBlYXRcIiwgXCJyZXBsYWNlXCIsIFwicmVwbGljYXRlXCIsIFwicmV2ZXJzZVwiLCBcInJ0cmltXCIsIFwic3BsaXRfcGFydFwiLCBcInN0cnBvc1wiLCBcInN0cnRvbFwiLFxuICAgICAgICBcInN1YnN0cmluZ1wiLCBcInRleHRsZW5cIiwgXCJ0cmFuc2xhdGVcIiwgXCJ0cmltXCIsIFwidXBwZXJcIiwgXCJjYXN0XCIsIFwiY29udmVydFwiLCBcInRvX2NoYXJcIiwgXCJ0b19kYXRlXCIsIFwidG9fbnVtYmVyXCIsIFwianNvbl9hcnJheV9sZW5ndGhcIixcbiAgICAgICAgXCJqc29uX2V4dHJhY3RfYXJyYXlfZWxlbWVudF90ZXh0XCIsIFwianNvbl9leHRyYWN0X3BhdGhfdGV4dFwiLCBcImN1cnJlbnRfc2V0dGluZ1wiLCBcInBnX2NhbmNlbF9iYWNrZW5kXCIsIFwicGdfdGVybWluYXRlX2JhY2tlbmRcIixcbiAgICAgICAgXCJzZXRfY29uZmlnXCIsIFwiY3VycmVudF9kYXRhYmFzZVwiLCBcImN1cnJlbnRfdXNlclwiLCBcImN1cnJlbnRfdXNlcl9pZFwiLCBcInBnX2JhY2tlbmRfcGlkXCIsIFwicGdfbGFzdF9jb3B5X2NvdW50XCIsIFwicGdfbGFzdF9jb3B5X2lkXCIsXG4gICAgICAgIFwicGdfbGFzdF9xdWVyeV9pZFwiLCBcInBnX2xhc3RfdW5sb2FkX2NvdW50XCIsIFwic2Vzc2lvbl91c2VyXCIsIFwic2xpY2VfbnVtXCIsIFwidXNlclwiLCBcInZlcnNpb25cIiwgXCJhYmJyZXZcIiwgXCJhY29zZFwiLCBcImFueVwiLCBcImFyZWFcIixcbiAgICAgICAgXCJhcnJheV9hZ2dcIiwgXCJhcnJheV9hcHBlbmRcIiwgXCJhcnJheV9jYXRcIiwgXCJhcnJheV9kaW1zXCIsIFwiYXJyYXlfZmlsbFwiLCBcImFycmF5X2xlbmd0aFwiLCBcImFycmF5X2xvd2VyXCIsIFwiYXJyYXlfbmRpbXNcIixcbiAgICAgICAgXCJhcnJheV9wb3NpdGlvblwiLCBcImFycmF5X3Bvc2l0aW9uc1wiLCBcImFycmF5X3ByZXBlbmRcIiwgXCJhcnJheV9yZW1vdmVcIiwgXCJhcnJheV9yZXBsYWNlXCIsIFwiYXJyYXlfdG9fanNvblwiLCBcImFycmF5X3RvX3N0cmluZ1wiLFxuICAgICAgICBcImFycmF5X3RvX3RzdmVjdG9yXCIsIFwiYXJyYXlfdXBwZXJcIiwgXCJhc2luZFwiLCBcImF0YW4yZFwiLCBcImF0YW5kXCIsIFwiYml0XCIsIFwiYml0X2xlbmd0aFwiLCBcImJvdW5kX2JveFwiLCBcImJveFwiLFxuICAgICAgICBcImJyaW5fc3VtbWFyaXplX25ld192YWx1ZXNcIiwgXCJicm9hZGNhc3RcIiwgXCJjYXJkaW5hbGl0eVwiLCBcImNlbnRlclwiLCBcImNpcmNsZVwiLCBcImNsb2NrX3RpbWVzdGFtcFwiLCBcImNvbF9kZXNjcmlwdGlvblwiLCBcImNvbmNhdF93c1wiLFxuICAgICAgICBcImNvbnZlcnRfZnJvbVwiLCBcImNvbnZlcnRfdG9cIiwgXCJjb3JyXCIsIFwiY29zZFwiLCBcImNvdGRcIiwgXCJjb3Zhcl9wb3BcIiwgXCJjb3Zhcl9zYW1wXCIsIFwiY3VycmVudF9jYXRhbG9nXCIsIFwiY3VycmVudF9xdWVyeVwiLFxuICAgICAgICBcImN1cnJlbnRfcm9sZVwiLCBcImN1cnJ2YWxcIiwgXCJjdXJzb3JfdG9feG1sXCIsIFwiZGlhbWV0ZXJcIiwgXCJkaXZcIiwgXCJlbmNvZGVcIiwgXCJlbnVtX2ZpcnN0XCIsIFwiZW51bV9sYXN0XCIsIFwiZW51bV9yYW5nZVwiLCBcImV2ZXJ5XCIsXG4gICAgICAgIFwiZmFtaWx5XCIsIFwiZm9ybWF0XCIsIFwiZm9ybWF0X3R5cGVcIiwgXCJnZW5lcmF0ZV9zZXJpZXNcIiwgXCJnZW5lcmF0ZV9zdWJzY3JpcHRzXCIsIFwiZ2V0X2N1cnJlbnRfdHNfY29uZmlnXCIsIFwiZ2luX2NsZWFuX3BlbmRpbmdfbGlzdFwiLFxuICAgICAgICBcImdyb3VwaW5nXCIsIFwiaGFzX2FueV9jb2x1bW5fcHJpdmlsZWdlXCIsIFwiaGFzX2NvbHVtbl9wcml2aWxlZ2VcIiwgXCJoYXNfZm9yZWlnbl9kYXRhX3dyYXBwZXJfcHJpdmlsZWdlXCIsIFwiaGFzX2Z1bmN0aW9uX3ByaXZpbGVnZVwiLFxuICAgICAgICBcImhhc19sYW5ndWFnZV9wcml2aWxlZ2VcIiwgXCJoYXNfc2VxdWVuY2VfcHJpdmlsZWdlXCIsIFwiaGFzX3NlcnZlcl9wcml2aWxlZ2VcIiwgXCJoYXNfdGFibGVzcGFjZV9wcml2aWxlZ2VcIiwgXCJoYXNfdHlwZV9wcml2aWxlZ2VcIixcbiAgICAgICAgXCJoZWlnaHRcIiwgXCJob3N0XCIsIFwiaG9zdG1hc2tcIiwgXCJpbmV0X2NsaWVudF9hZGRyXCIsIFwiaW5ldF9jbGllbnRfcG9ydFwiLCBcImluZXRfbWVyZ2VcIiwgXCJpbmV0X3NhbWVfZmFtaWx5XCIsIFwiaW5ldF9zZXJ2ZXJfYWRkclwiLFxuICAgICAgICBcImluZXRfc2VydmVyX3BvcnRcIiwgXCJpc2Nsb3NlZFwiLCBcImlzZW1wdHlcIiwgXCJpc29wZW5cIiwgXCJqc29uX2FnZ1wiLCBcImpzb25fb2JqZWN0XCIsIFwianNvbl9vYmplY3RfYWdnXCIsIFwianNvbl9wb3B1bGF0ZV9yZWNvcmRcIixcbiAgICAgICAgXCJqc29uX3BvcHVsYXRlX3JlY29yZHNldFwiLCBcImpzb25fdG9fcmVjb3JkXCIsIFwianNvbl90b19yZWNvcmRzZXRcIiwgXCJqc29uYl9hZ2dcIiwgXCJqc29uYl9vYmplY3RfYWdnXCIsIFwianVzdGlmeV9kYXlzXCIsIFwianVzdGlmeV9ob3Vyc1wiLFxuICAgICAgICBcImp1c3RpZnlfaW50ZXJ2YWxcIiwgXCJsYXN0dmFsXCIsIFwibGVmdFwiLCBcImxpbmVcIiwgXCJsb2NhbHRpbWVzdGFtcFwiLCBcImxvd2VyX2luY1wiLCBcImxvd2VyX2luZlwiLCBcImxwYWRcIiwgXCJsc2VnXCIsIFwibWFrZV9kYXRlXCIsXG4gICAgICAgIFwibWFrZV9pbnRlcnZhbFwiLCBcIm1ha2VfdGltZVwiLCBcIm1ha2VfdGltZXN0YW1wXCIsIFwibWFrZV90aW1lc3RhbXB0elwiLCBcIm1hc2tsZW5cIiwgXCJtb2RlXCIsIFwibmV0bWFza1wiLCBcIm5ldHdvcmtcIiwgXCJuZXh0dmFsXCIsIFwibnBvaW50c1wiLFxuICAgICAgICBcIm51bV9ub25udWxsc1wiLCBcIm51bV9udWxsc1wiLCBcIm51bW5vZGVcIiwgXCJvYmpfZGVzY3JpcHRpb25cIiwgXCJvdmVybGF5XCIsIFwicGFyc2VfaWRlbnRcIiwgXCJwYXRoXCIsIFwicGNsb3NlXCIsIFwicGVyY2VudGlsZV9kaXNjXCIsXG4gICAgICAgIFwicGdfYWR2aXNvcnlfbG9ja1wiLCBcInBnX2Fkdmlzb3J5X2xvY2tfc2hhcmVkXCIsIFwicGdfYWR2aXNvcnlfdW5sb2NrXCIsIFwicGdfYWR2aXNvcnlfdW5sb2NrX2FsbFwiLCBcInBnX2Fkdmlzb3J5X3VubG9ja19zaGFyZWRcIixcbiAgICAgICAgXCJwZ19hZHZpc29yeV94YWN0X2xvY2tcIiwgXCJwZ19hZHZpc29yeV94YWN0X2xvY2tfc2hhcmVkXCIsIFwicGdfYmFja3VwX3N0YXJ0X3RpbWVcIiwgXCJwZ19ibG9ja2luZ19waWRzXCIsIFwicGdfY2xpZW50X2VuY29kaW5nXCIsXG4gICAgICAgIFwicGdfY29sbGF0aW9uX2lzX3Zpc2libGVcIiwgXCJwZ19jb2x1bW5fc2l6ZVwiLCBcInBnX2NvbmZfbG9hZF90aW1lXCIsIFwicGdfY29udHJvbF9jaGVja3BvaW50XCIsIFwicGdfY29udHJvbF9pbml0XCIsIFwicGdfY29udHJvbF9yZWNvdmVyeVwiLFxuICAgICAgICBcInBnX2NvbnRyb2xfc3lzdGVtXCIsIFwicGdfY29udmVyc2lvbl9pc192aXNpYmxlXCIsIFwicGdfY3JlYXRlX2xvZ2ljYWxfcmVwbGljYXRpb25fc2xvdFwiLCBcInBnX2NyZWF0ZV9waHlzaWNhbF9yZXBsaWNhdGlvbl9zbG90XCIsXG4gICAgICAgIFwicGdfY3JlYXRlX3Jlc3RvcmVfcG9pbnRcIiwgXCJwZ19jdXJyZW50X3hsb2dfZmx1c2hfbG9jYXRpb25cIiwgXCJwZ19jdXJyZW50X3hsb2dfaW5zZXJ0X2xvY2F0aW9uXCIsIFwicGdfY3VycmVudF94bG9nX2xvY2F0aW9uXCIsXG4gICAgICAgIFwicGdfZGF0YWJhc2Vfc2l6ZVwiLCBcInBnX2Rlc2NyaWJlX29iamVjdFwiLCBcInBnX2Ryb3BfcmVwbGljYXRpb25fc2xvdFwiLCBcInBnX2V4cG9ydF9zbmFwc2hvdFwiLCBcInBnX2ZpbGVub2RlX3JlbGF0aW9uXCIsXG4gICAgICAgIFwicGdfZnVuY3Rpb25faXNfdmlzaWJsZVwiLCBcInBnX2dldF9jb25zdHJhaW50ZGVmXCIsIFwicGdfZ2V0X2V4cHJcIiwgXCJwZ19nZXRfZnVuY3Rpb25fYXJndW1lbnRzXCIsIFwicGdfZ2V0X2Z1bmN0aW9uX2lkZW50aXR5X2FyZ3VtZW50c1wiLFxuICAgICAgICBcInBnX2dldF9mdW5jdGlvbl9yZXN1bHRcIiwgXCJwZ19nZXRfZnVuY3Rpb25kZWZcIiwgXCJwZ19nZXRfaW5kZXhkZWZcIiwgXCJwZ19nZXRfa2V5d29yZHNcIiwgXCJwZ19nZXRfb2JqZWN0X2FkZHJlc3NcIixcbiAgICAgICAgXCJwZ19nZXRfb3duZWRfc2VxdWVuY2VcIiwgXCJwZ19nZXRfcnVsZWRlZlwiLCBcInBnX2dldF9zZXJpYWxfc2VxdWVuY2VcIiwgXCJwZ19nZXRfdHJpZ2dlcmRlZlwiLCBcInBnX2dldF91c2VyYnlpZFwiLCBcInBnX2dldF92aWV3ZGVmXCIsXG4gICAgICAgIFwicGdfaGFzX3JvbGVcIiwgXCJwZ19pZGVudGlmeV9vYmplY3RcIiwgXCJwZ19pZGVudGlmeV9vYmplY3RfYXNfYWRkcmVzc1wiLCBcInBnX2luZGV4X2NvbHVtbl9oYXNfcHJvcGVydHlcIiwgXCJwZ19pbmRleF9oYXNfcHJvcGVydHlcIixcbiAgICAgICAgXCJwZ19pbmRleGFtX2hhc19wcm9wZXJ0eVwiLCBcInBnX2luZGV4ZXNfc2l6ZVwiLCBcInBnX2lzX2luX2JhY2t1cFwiLCBcInBnX2lzX2luX3JlY292ZXJ5XCIsIFwicGdfaXNfb3RoZXJfdGVtcF9zY2hlbWFcIixcbiAgICAgICAgXCJwZ19pc194bG9nX3JlcGxheV9wYXVzZWRcIiwgXCJwZ19sYXN0X2NvbW1pdHRlZF94YWN0XCIsIFwicGdfbGFzdF94YWN0X3JlcGxheV90aW1lc3RhbXBcIiwgXCJwZ19sYXN0X3hsb2dfcmVjZWl2ZV9sb2NhdGlvblwiLFxuICAgICAgICBcInBnX2xhc3RfeGxvZ19yZXBsYXlfbG9jYXRpb25cIiwgXCJwZ19saXN0ZW5pbmdfY2hhbm5lbHNcIiwgXCJwZ19sb2dpY2FsX2VtaXRfbWVzc2FnZVwiLCBcInBnX2xvZ2ljYWxfc2xvdF9nZXRfYmluYXJ5X2NoYW5nZXNcIixcbiAgICAgICAgXCJwZ19sb2dpY2FsX3Nsb3RfZ2V0X2NoYW5nZXNcIiwgXCJwZ19sb2dpY2FsX3Nsb3RfcGVla19iaW5hcnlfY2hhbmdlc1wiLCBcInBnX2xvZ2ljYWxfc2xvdF9wZWVrX2NoYW5nZXNcIiwgXCJwZ19sc19kaXJcIixcbiAgICAgICAgXCJwZ19teV90ZW1wX3NjaGVtYVwiLCBcInBnX25vdGlmaWNhdGlvbl9xdWV1ZV91c2FnZVwiLCBcInBnX29wY2xhc3NfaXNfdmlzaWJsZVwiLCBcInBnX29wZXJhdG9yX2lzX3Zpc2libGVcIiwgXCJwZ19vcGZhbWlseV9pc192aXNpYmxlXCIsXG4gICAgICAgIFwicGdfb3B0aW9uc190b190YWJsZVwiLCBcInBnX3Bvc3RtYXN0ZXJfc3RhcnRfdGltZVwiLCBcInBnX3JlYWRfYmluYXJ5X2ZpbGVcIiwgXCJwZ19yZWFkX2ZpbGVcIiwgXCJwZ19yZWxhdGlvbl9maWxlbm9kZVwiLFxuICAgICAgICBcInBnX3JlbGF0aW9uX2ZpbGVwYXRoXCIsIFwicGdfcmVsYXRpb25fc2l6ZVwiLCBcInBnX3JlbG9hZF9jb25mXCIsIFwicGdfcmVwbGljYXRpb25fb3JpZ2luX2NyZWF0ZVwiLCBcInBnX3JlcGxpY2F0aW9uX29yaWdpbl9kcm9wXCIsXG4gICAgICAgIFwicGdfcmVwbGljYXRpb25fb3JpZ2luX29pZFwiLCBcInBnX3JlcGxpY2F0aW9uX29yaWdpbl9wcm9ncmVzc1wiLCBcInBnX3JlcGxpY2F0aW9uX29yaWdpbl9zZXNzaW9uX2lzX3NldHVwXCIsXG4gICAgICAgIFwicGdfcmVwbGljYXRpb25fb3JpZ2luX3Nlc3Npb25fcHJvZ3Jlc3NcIiwgXCJwZ19yZXBsaWNhdGlvbl9vcmlnaW5fc2Vzc2lvbl9yZXNldFwiLCBcInBnX3JlcGxpY2F0aW9uX29yaWdpbl9zZXNzaW9uX3NldHVwXCIsXG4gICAgICAgIFwicGdfcmVwbGljYXRpb25fb3JpZ2luX3hhY3RfcmVzZXRcIiwgXCJwZ19yZXBsaWNhdGlvbl9vcmlnaW5feGFjdF9zZXR1cFwiLCBcInBnX3JvdGF0ZV9sb2dmaWxlXCIsIFwicGdfc2l6ZV9ieXRlc1wiLCBcInBnX3NpemVfcHJldHR5XCIsXG4gICAgICAgIFwicGdfc2xlZXBcIiwgXCJwZ19zbGVlcF9mb3JcIiwgXCJwZ19zbGVlcF91bnRpbFwiLCBcInBnX3N0YXJ0X2JhY2t1cFwiLCBcInBnX3N0YXRfZmlsZVwiLCBcInBnX3N0b3BfYmFja3VwXCIsIFwicGdfc3dpdGNoX3hsb2dcIixcbiAgICAgICAgXCJwZ190YWJsZV9pc192aXNpYmxlXCIsIFwicGdfdGFibGVfc2l6ZVwiLCBcInBnX3RhYmxlc3BhY2VfZGF0YWJhc2VzXCIsIFwicGdfdGFibGVzcGFjZV9sb2NhdGlvblwiLCBcInBnX3RhYmxlc3BhY2Vfc2l6ZVwiLFxuICAgICAgICBcInBnX3RvdGFsX3JlbGF0aW9uX3NpemVcIiwgXCJwZ190cmlnZ2VyX2RlcHRoXCIsIFwicGdfdHJ5X2Fkdmlzb3J5X2xvY2tcIiwgXCJwZ190cnlfYWR2aXNvcnlfbG9ja19zaGFyZWRcIiwgXCJwZ190cnlfYWR2aXNvcnlfeGFjdF9sb2NrXCIsXG4gICAgICAgIFwicGdfdHJ5X2Fkdmlzb3J5X3hhY3RfbG9ja19zaGFyZWRcIiwgXCJwZ190c19jb25maWdfaXNfdmlzaWJsZVwiLCBcInBnX3RzX2RpY3RfaXNfdmlzaWJsZVwiLCBcInBnX3RzX3BhcnNlcl9pc192aXNpYmxlXCIsXG4gICAgICAgIFwicGdfdHNfdGVtcGxhdGVfaXNfdmlzaWJsZVwiLCBcInBnX3R5cGVfaXNfdmlzaWJsZVwiLCBcInBnX3R5cGVvZlwiLCBcInBnX3hhY3RfY29tbWl0X3RpbWVzdGFtcFwiLCBcInBnX3hsb2dfbG9jYXRpb25fZGlmZlwiLFxuICAgICAgICBcInBnX3hsb2dfcmVwbGF5X3BhdXNlXCIsIFwicGdfeGxvZ19yZXBsYXlfcmVzdW1lXCIsIFwicGdfeGxvZ2ZpbGVfbmFtZVwiLCBcInBnX3hsb2dmaWxlX25hbWVfb2Zmc2V0XCIsIFwicGhyYXNldG9fdHNxdWVyeVwiLFxuICAgICAgICBcInBsYWludG9fdHNxdWVyeVwiLCBcInBvaW50XCIsIFwicG9seWdvblwiLCBcInBvcGVuXCIsIFwicHFzZXJ2ZXJ2ZXJzaW9uXCIsIFwicXVlcnlfdG9feG1sXCIsIFwicXVlcnl0cmVlXCIsIFwicXVvdGVfbnVsbGFibGVcIiwgXCJyYWRpdXNcIixcbiAgICAgICAgXCJyYW5nZV9tZXJnZVwiLCBcInJlZ2V4cF9tYXRjaGVzXCIsIFwicmVnZXhwX3NwbGl0X3RvX2FycmF5XCIsIFwicmVnZXhwX3NwbGl0X3RvX3RhYmxlXCIsIFwicmVncl9hdmd4XCIsIFwicmVncl9hdmd5XCIsIFwicmVncl9jb3VudFwiLFxuICAgICAgICBcInJlZ3JfaW50ZXJjZXB0XCIsIFwicmVncl9yMlwiLCBcInJlZ3Jfc2xvcGVcIiwgXCJyZWdyX3N4eFwiLCBcInJlZ3Jfc3h5XCIsIFwicmVncl9zeXlcIiwgXCJyaWdodFwiLCBcInJvd19zZWN1cml0eV9hY3RpdmVcIiwgXCJyb3dfdG9fanNvblwiLFxuICAgICAgICBcInJwYWRcIiwgXCJzY2FsZVwiLCBcInNldF9tYXNrbGVuXCIsIFwic2V0c2VlZFwiLCBcInNldHZhbFwiLCBcInNldHdlaWdodFwiLCBcInNob2JqX2Rlc2NyaXB0aW9uXCIsIFwic2luZFwiLCBcInNwcmludGZcIiwgXCJzdGF0ZW1lbnRfdGltZXN0YW1wXCIsXG4gICAgICAgIFwic3RkZGV2XCIsIFwic3RyaW5nX2FnZ1wiLCBcInN0cmluZ190b19hcnJheVwiLCBcInN0cmlwXCIsIFwic3Vic3RyXCIsIFwidGFibGVfdG9feG1sXCIsIFwidGFibGVfdG9feG1sX2FuZF94bWxzY2hlbWFcIiwgXCJ0YW5kXCIsIFwidGV4dFwiLFxuICAgICAgICBcInRvX2pzb25cIiwgXCJ0b19yZWdjbGFzc1wiLCBcInRvX3JlZ25hbWVzcGFjZVwiLCBcInRvX3JlZ29wZXJcIiwgXCJ0b19yZWdvcGVyYXRvclwiLCBcInRvX3JlZ3Byb2NcIiwgXCJ0b19yZWdwcm9jZWR1cmVcIiwgXCJ0b19yZWdyb2xlXCIsXG4gICAgICAgIFwidG9fcmVndHlwZVwiLCBcInRvX3RzcXVlcnlcIiwgXCJ0b190c3ZlY3RvclwiLCBcInRyYW5zYWN0aW9uX3RpbWVzdGFtcFwiLCBcInRzX2RlYnVnXCIsIFwidHNfZGVsZXRlXCIsIFwidHNfZmlsdGVyXCIsIFwidHNfaGVhZGxpbmVcIixcbiAgICAgICAgXCJ0c19sZXhpemVcIiwgXCJ0c19wYXJzZVwiLCBcInRzX3JhbmtcIiwgXCJ0c19yYW5rX2NkXCIsIFwidHNfcmV3cml0ZVwiLCBcInRzX3N0YXRcIiwgXCJ0c190b2tlbl90eXBlXCIsIFwidHNxdWVyeV9waHJhc2VcIiwgXCJ0c3ZlY3Rvcl90b19hcnJheVwiLFxuICAgICAgICBcInRzdmVjdG9yX3VwZGF0ZV90cmlnZ2VyXCIsIFwidHN2ZWN0b3JfdXBkYXRlX3RyaWdnZXJfY29sdW1uXCIsIFwidHhpZF9jdXJyZW50XCIsIFwidHhpZF9jdXJyZW50X3NuYXBzaG90XCIsIFwidHhpZF9zbmFwc2hvdF94aXBcIixcbiAgICAgICAgXCJ0eGlkX3NuYXBzaG90X3htYXhcIiwgXCJ0eGlkX3NuYXBzaG90X3htaW5cIiwgXCJ0eGlkX3Zpc2libGVfaW5fc25hcHNob3RcIiwgXCJ1bm5lc3RcIiwgXCJ1cHBlcl9pbmNcIiwgXCJ1cHBlcl9pbmZcIiwgXCJ2YXJpYW5jZVwiLCBcIndpZHRoXCIsXG4gICAgICAgIFwid2lkdGhfYnVja2V0XCIsIFwieG1sX2lzX3dlbGxfZm9ybWVkXCIsIFwieG1sX2lzX3dlbGxfZm9ybWVkX2NvbnRlbnRcIiwgXCJ4bWxfaXNfd2VsbF9mb3JtZWRfZG9jdW1lbnRcIiwgXCJ4bWxhZ2dcIiwgXCJ4bWxjb21tZW50XCIsXG4gICAgICAgIFwieG1sY29uY2F0XCIsIFwieG1sZWxlbWVudFwiLCBcInhtbGV4aXN0c1wiLCBcInhtbGZvcmVzdFwiLCBcInhtbHBhcnNlXCIsIFwieG1scGlcIiwgXCJ4bWxyb290XCIsIFwieG1sc2VyaWFsaXplXCIsIFwieHBhdGhcIiwgXCJ4cGF0aF9leGlzdHNcIlxuICAgIF0sXG4gICAgYnVpbHRpblZhcmlhYmxlczogW1xuICAgIC8vIE5PVCBTVVBQT1JURURcbiAgICBdLFxuICAgIHBzZXVkb0NvbHVtbnM6IFtcbiAgICAvLyBOT1QgU1VQUE9SVEVEXG4gICAgXSxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGNvbW1lbnRzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAcHNldWRvQ29sdW1ucycgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BudW1iZXJzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHN0cmluZ3MnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAY29tcGxleElkZW50aWZpZXJzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHNjb3BlcycgfSxcbiAgICAgICAgICAgIFsvWzssLl0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbL1soKV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL1tcXHdAIyRdKy8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdvcGVyYXRvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGJ1aWx0aW5WYXJpYWJsZXMnOiAncHJlZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGJ1aWx0aW5GdW5jdGlvbnMnOiAncHJlZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9bPD49ISUmK1xcLSovfH5eXS8sICdvcGVyYXRvciddLFxuICAgICAgICBdLFxuICAgICAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICAgICAgICBbL1xccysvLCAnd2hpdGUnXVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50czogW1xuICAgICAgICAgICAgWy8tLSsuKi8sICdjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcKi8sIHsgdG9rZW46ICdjb21tZW50LnF1b3RlJywgbmV4dDogJ0Bjb21tZW50JyB9XVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1teKi9dKy8sICdjb21tZW50J10sXG4gICAgICAgICAgICAvLyBOb3Qgc3VwcG9ydGluZyBuZXN0ZWQgY29tbWVudHMsIGFzIG5lc3RlZCBjb21tZW50cyBzZWVtIHRvIG5vdCBiZSBzdGFuZGFyZD9cbiAgICAgICAgICAgIC8vIGkuZS4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MjgxNzIvYXJlLXRoZXJlLW11bHRpbGluZS1jb21tZW50LWRlbGltaXRlcnMtaW4tc3FsLXRoYXQtYXJlLXZlbmRvci1hZ25vc3RpY1xuICAgICAgICAgICAgLy8gWy9cXC9cXCovLCB7IHRva2VuOiAnY29tbWVudC5xdW90ZScsIG5leHQ6ICdAcHVzaCcgfV0sICAgIC8vIG5lc3RlZCBjb21tZW50IG5vdCBhbGxvd2VkIDotKFxuICAgICAgICAgICAgWy9cXCpcXC8vLCB7IHRva2VuOiAnY29tbWVudC5xdW90ZScsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvLi8sICdjb21tZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgcHNldWRvQ29sdW1uczogW1xuICAgICAgICAgICAgWy9bJF1bQS1aYS16X11bXFx3QCMkXSovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQHBzZXVkb0NvbHVtbnMnOiAncHJlZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICBdLFxuICAgICAgICBudW1iZXJzOiBbXG4gICAgICAgICAgICBbLzBbeFhdWzAtOWEtZkEtRl0qLywgJ251bWJlciddLFxuICAgICAgICAgICAgWy9bJF1bKy1dKlxcZCooXFwuXFxkKik/LywgJ251bWJlciddLFxuICAgICAgICAgICAgWy8oKFxcZCsoXFwuXFxkKik/KXwoXFwuXFxkKykpKFtlRV1bXFwtK10/XFxkKyk/LywgJ251bWJlciddXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgICAgIFsvJy8sIHsgdG9rZW46ICdzdHJpbmcnLCBuZXh0OiAnQHN0cmluZycgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZzogW1xuICAgICAgICAgICAgWy9bXiddKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvJycvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbLycvLCB7IHRva2VuOiAnc3RyaW5nJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIGNvbXBsZXhJZGVudGlmaWVyczogW1xuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdpZGVudGlmaWVyLnF1b3RlJywgbmV4dDogJ0BxdW90ZWRJZGVudGlmaWVyJyB9XVxuICAgICAgICBdLFxuICAgICAgICBxdW90ZWRJZGVudGlmaWVyOiBbXG4gICAgICAgICAgICBbL1teXCJdKy8sICdpZGVudGlmaWVyJ10sXG4gICAgICAgICAgICBbL1wiXCIvLCAnaWRlbnRpZmllciddLFxuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdpZGVudGlmaWVyLnF1b3RlJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIHNjb3BlczogW1xuICAgICAgICAvLyBOT1QgU1VQUE9SVEVEXG4gICAgICAgIF1cbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==