# Websites Release Notes Generator
Generates release notes for the currently tagged version, or for a range of tags/commit hashes.

## Usage
Note: you must have a GitHub personal access token to execute these scripts. You can create an access token via https://github.com/settings/tokens and then set the `GITHUB_PERSONAL_ACCESS_TOKEN` variable in a `.env` file within the project root.

- Install dependencies
- Run `./node_modules/.bin/website-release-notes` from the project root to generate notes based off the current project tag

This will output the tag name and generate the release name and notes.

Example:
```
v0.11.1

Ox Georgetown Nemata

8 PRs totaling 33 commits in 50 files [+414 / -148]

- #249 BC-OGJ-eventsLink @Alixers505
- #250 Remove link to site license info @solocommand
- #253 Add GTXcel link to site license banner @solocommand
- #252 BC-magBtns-mobile: added top margin for item__button @Alixers505
- #255 BC-ILS/VSD: added /events to resources nav @Alixers505
- #256 CS2430-LFW: updated subscribe form link @Alixers505
- #254 NativeX "templateless" delivery support @zarathustra323
- #251 Wufoo survey integration @solocommand
```
