import math
import heapq
from typing import List

class Solution:
    def sumDigitDifferences(self, nums: List[int]) -> int:
        if not nums:
            return 0
        
        # Determine the number of digits
        d = len(str(nums[0]))
        
        # Initialize the digit counts
        digit_counts = [{} for _ in range(d)]
        
        # Count digits in each position
        for num in nums:
            str_num = str(num)
            for i, digit in enumerate(str_num):
                if digit not in digit_counts[i]:
                    digit_counts[i][digit] = 0
                digit_counts[i][digit] += 1
        
        # Calculate total differences
        total_diff = 0
        for i in range(d):
            for digit1 in digit_counts[i]:
                count1 = digit_counts[i][digit1]
                for digit2 in digit_counts[i]:
                    if digit1 != digit2:
                        count2 = digit_counts[i][digit2]
                        total_diff += count1 * count2
        
        return total_diff

# Example usage
sol = Solution()
nums = [12345, 67890, 23456, 78901]
print(sol.sumDigitDifferences(nums))  # Output will depend on the input list of numbers
