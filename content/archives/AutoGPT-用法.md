---
title: "AutoGPT 用法"
categories: [ "AIGC" ]
tags: [  ]
draft: false
slug: "785"
date: "2023-05-01 00:06:36"
---

```bash
git clone https://github.com/Torantulino/Auto-GPT.git
cd 'Auto-GPT'
pip install -r requirements.txt
# Rename .env.template to .env and fill in your OPENAI_API_KEY. If you plan to use Speech Mode, fill in your ELEVEN_LABS_API_KEY as well.
python scripts/main.py
# You will find activity and error logs in the folder ./output/logs
python scripts/main.py --debug
```

## References

* [https://github.com/Torantulino/Auto-GPT](https://github.com/Torantulino/Auto-GPT)
* [https://beta.elevenlabs.io/](https://beta.elevenlabs.io/)
* [https://agentgpt.reworkd.ai/](https://agentgpt.reworkd.ai/)

