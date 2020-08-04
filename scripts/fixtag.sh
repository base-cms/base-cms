#!/bin/bash

usage() {
cat << EOF
Usage: $0 <TAG>

Converts a lightweight tag (such as created through the GitHub UI) into an
annotated one. Lerna only uses annotated tags to consider versions, so if
a lightweight tag is created, it won't be used when considering tags for
versioning or publishing.

NOTE: Any release associated with the lightweight tag MAY be irrecoverably
deleted. Make sure you preserve any needed information (such as release notes
or published artifacts) before using this tool.

See the following for more info:
- https://github.com/lerna/lerna/blob/master/doc/troubleshooting.md#publish-does-not-detect-manually-created-tags-in-fixed-mode-with-githubgithub-enterprise
- https://stackoverflow.com/questions/5002555/can-a-lightweight-tag-be-converted-to-an-annotated-tag

EOF
}

[[ -z "$1" ]] && usage && exit 1

git tag -a -f $1 $1
git push --force origin $1
