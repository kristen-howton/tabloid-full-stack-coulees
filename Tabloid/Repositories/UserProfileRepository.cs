﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<UserProfile> GetAll()
        {
            return _context.UserProfile
                    .Include(up => up.UserType)
                    .OrderBy(up => up.DisplayName)
                    .ToList();
        }
        public List<UserProfile> GetAllActive()
        {
            return _context.UserProfile
                    .Include(up => up.UserType)
                    .Where(up => up.IsApproved == true)
                    .OrderBy(up => up.DisplayName)
                    .ToList();
        }
        public List<UserProfile> GetDeactivated()
        {
            return _context.UserProfile
                    .Include(up => up.UserType)
                    .Where(up => up.IsApproved == false)
                    .OrderBy(up => up.DisplayName)
                    .ToList();
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType).AsNoTracking() 
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(UserProfile userProfile)
        {
            userProfile.IsApproved = true;
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        public void Update(UserProfile user)
        {
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
