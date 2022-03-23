
CREATE TABLE IF NOT EXISTS scylla.messages (
	id timeuuid,
	chat_id uuid,
	sender_id uuid,
	year_month text, -- prevent partition overflow
	messag_text text,
	created_at timestamp,
	updated_at timestamp,
	PRIMARY KEY ((chat_id, year_month), id)
) WITH CLUSTERING ORDER BY (id DESC)
  AND COMPACTION = {
    'class': 'TimeWindowCompactionStrategy',
    'base_time_seconds': 3600,
    'max_sstable_age_days': 1
  };

