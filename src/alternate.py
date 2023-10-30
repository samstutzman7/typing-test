import random

def alternate_words(six_letter_words, seven_letter_words):
    result = []
    i, j = 0, 0

    while i < len(six_letter_words) and j < len(seven_letter_words):
        result.append(seven_letter_words[j])
        result.append(six_letter_words[i])
        j += 1
        i += 1

    # If one list is longer than the other, add the remaining words from that list.
    result.extend(six_letter_words[i:])
    result.extend(seven_letter_words[j:])

    return result

# Example usage:
six_letter_words = [
    "yellow", "banana", "purple", "forest", "silver", "winter", "guitar", "honest", "sunset", "marble",
    "breeze", "safari", "family", "beacon", "summer", "garden", "purple", "candle", "rocket", "shadow",
    "puzzle", "smooth", "coffee", "singer", "castle", "planet", "temple", "canine", "planet", "rabbit",
    "puzzle", "carpet", "genius", "flight", "keypad", "planet", "castle", "temple", "candle", "winter",
    "yellow", "purple", "marble", "forest", "rocket", "breeze", "beacon", "banana", "family", "silver",
    "forest", "guitar", "winter", "sunset", "coffee", "beacon", "smooth", "rocket", "shadow", "marble",
    "genius", "puzzle", "temple", "planet", "coffee", "puzzle", "shadow", "canine", "safari", "sunset",
    "safari", "singer", "summer", "flight", "temple", "castle", "rabbit", "family", "castle", "coffee",
    "genius", "singer", "guitar", "beacon", "rocket", "summer", "breeze", "sunset", "puzzle", "silver",
    "temple", "planet", "forest", "rabbit", "purple", "marble", "shadow", "guitar", "sunset", "family",
    "temple", "puzzle", "banana", "safari", "silver", "winter", "shadow", "coffee", "genius", "rocket",
    "breeze", "rabbit", "marble", "silver", "genius", "breeze", "guitar", "shadow", "marble", "summer",
    "camera", "pretty", "purple", "rocket", "silent", "summer", "yellow", "frozen", "gentle", "marble",
    "safari", "temple", "banana", "forest", "silver", "coffee", "genius", "rabbit", "shadow", "beacon",
    "breeze", "castle", "flight", "family", "sunset", "guitar", "planet", "smooth", "winter", "candle",
    "canine", "rocket", "sunset", "beacon", "flight", "silver", "castle", "planet", "rabbit", "shadow",
    "breeze", "guitar", "family", "coffee", "genius", "genius", "sunset", "rocket", "rabbit", "summer",
    "shadow", "breeze", "guitar", "forest", "flight", "coffee", "castle", "temple", "winter", "silver",
    "purple", "marble", "marble", "shadow", "rocket", "sunset", "coffee", "safari", "temple", "banana",
    "pretty", "rocket", "camera", "frozen", "gentle", "summer", "yellow", "shadow", "smooth", "beacon",
    "rocket", "temple", "purple", "flight", "rabbit", "sunset", "family", "coffee", "candle", "beacon",
    "winter", "genius", "sunset", "shadow", "forest", "gentle", "rocket", "banana", "family", "summer",
    "pretty", "candle", "guitar", "rabbit", "frozen", "smooth", "planet", "safari", "castle", "planet"
]

seven_letter_words = [
    "breathe", "glasses", "honesty", "journey", "freedom", "chicken", "noodles", "jackets", "whisper", "garbage",
    "concert", "morning", "plaster", "cowards", "ancient", "promise", "hostess", "gardens", "simplify", "feather",
    "weather", "soldier", "village", "library", "alcohol", "fingers", "musical", "breathe", "muscles", "present",
    "whisper", "garbage", "freedom", "journey", "feather", "library", "weather", "promise", "chicken", "morning",
    "plaster", "village", "soldier", "honesty", "glasses", "noodles", "simplify", "ancient", "fingers", "alcohol",
    "jackets", "concert", "cowards", "present", "hostess", "breathe", "noodles", "chicken", "whisper", "freedom",
    "journey", "glasses", "feather", "morning", "promise", "weather", "hostess", "honesty", "soldier", "simplify",
    "fingers", "garbage", "muscles", "village", "present", "cowards", "library", "concert", "plaster", "alcohol",
    "ancient", "musical", "breathe", "weather", "jackets", "freedom", "glasses", "honesty", "feather", "journey",
    "library", "whisper", "promise", "noodles", "present", "soldier", "plaster", "village", "morning", "ancient",
    "simplify", "cowards", "chicken", "muscles", "concert", "garbage", "alcohol", "musical", "hostess", "village",
    "morning", "jackets", "freedom", "simplify", "breathe", "glasses", "promise", "feather", "present", "whisper",
    "ancient", "honesty", "library", "noodles", "cowards", "concert", "plaster", "soldier", "chicken", "alcohol",
    "garbage", "muscles", "weather", "musical", "hostess", "journey",
    "harness", "whisper", "musical", "freedom", "library", "fingers", "journey", "soldier", "village", "morning",
    "ancient", "garbage", "weather", "present", "promise", "simplify", "concert", "cowards", "plaster", "muscles",
    "jackets", "feather", "chicken", "hostess", "breathe", "whisper", "morning", "freedom", "feather", "plaster",
    "promise", "jackets", "soldier", "journey", "village", "cowards", "concert", "library", "simplify", "fingers",
    "ancient", "muscles", "whisper", "present", "breathe", "chicken", "hostess", "garbage", "morning", "alcohol",
    "promise", "library", "harness", "soldier", "freedom", "simplify", "weather", "glasses", "feather", "musical",
    "morning", "village", "present", "plaster", "library", "freedom", "jackets", "whisper", "ancient", "fingers",
    "muscles", "soldier", "concert", "feather", "cowards", "promise", "weather", "hostess", "chicken", "breathe",
    "noodles", "library", "cowards", "concert", "harness", "whisper", "feather", "glasses", "promise", "musical",
    "simplify", "ancient", "freedom", "morning", "village", "plaster", "present", "soldier", "weather", "chicken",
    "jackets", "fingers", "garbage", "whisper", "cowards", "library", "hostess", "feather", "noodles", "morning",
    "freedom", "musical", "chicken", "promise", "glasses", "simplify", "breathe", "journey", "weather", "ancient",
    "concert", "plaster", "soldier", "village", "noodles", "jackets", "morning", "library", "harness", "fingers",
    "feather", "whisper", "freedom", "simplify", "present", "cowards", "weather", "musical", "promise", "soldier",
    "library", "village"
]

for _ in range(25):
    random.shuffle(seven_letter_words)
    random.shuffle(six_letter_words)

    result = alternate_words(seven_letter_words[:50], six_letter_words[:50])

    # Join the words with spaces and print them in the desired format
    formatted_result = " ".join(result)
    print(formatted_result)
